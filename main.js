var MainState = {
    preload: function() {
      newGame.load.audio('jump', 'assets/sounds/jump.wav');
      newGame.load.audio('end_of_game', 'assets/sounds/end_of_game.wav');
      newGame.load.image('flappy_bird_yellow', 'assets/images/flappy_bird_yellow.jpg');
      newGame.load.image('green_pipe', 'assets/images/green_pipe.png');
      newGame.load.image('yellow_star', 'assets/images/yellow_star.png');
    },

    create: function() {
      this.score = 0;
      this.scoreText = newGame.add.text(20, 20, "0",
                  { font: "50px Arial", fill: "#ffffff" });
      newGame.stage.backgroundColor = '#71c5cf';

      this.flappingNoise = newGame.add.audio('jump');
      this.endOfGame = newGame.add.audio('end_of_game');

      this.pipes = newGame.add.group();
      this.stars = newGame.add.group();
      this.bird = newGame.add.sprite(100, 245, 'flappy_bird_yellow');
      this.bird.anchor.setTo(-0.2, 0.5);

      newGame.physics.startSystem(Phaser.Physics.ARCADE);
      newGame.physics.arcade.enable(this.bird);
      this.timer = newGame.time.events.loop(1500, this.addPipeRow, this);

      this.bird.body.gravity.y = 1300;

      var spaceKey = newGame.input.keyboard.addKey(
                      Phaser.Keyboard.SPACEBAR);
      spaceKey.onDown.add(this.flyUp, this);
    },

    update: function() {
        if (this.bird.y > 590 || this.bird.y < 0) {
          this.gameOver();
        }
        newGame.physics.arcade.overlap(this.bird, this.pipes, this.pipeCollision, null, this);

        if (this.stars != null) {
          newGame.physics.arcade.overlap(this.bird, this.stars, this.gotStar, null, this);
        }

        if (this.bird.angle < 15) {
          this.bird.angle += 1;
        }
    },

    flyUp: function() {
      if (!this.bird.alive) {
        return;
      }
      this.bird.body.velocity.y = -350;
      var tiltAnimation = newGame.add.tween(this.bird);

      tiltAnimation.to({angle: -10}, 500);
      tiltAnimation.start();
      this.flappingNoise.play();
    },

    gameOver: function() {
      newGame.state.start('GameOverState');
    },

    addPipe: function(x, y) {
      var newPipe = newGame.add.sprite(x, y, 'green_pipe');

      this.pipes.add(newPipe);

      newGame.physics.arcade.enable(newPipe);

      newPipe.body.velocity.x = -200;

      newPipe.checkWorldBounds = true;
      newPipe.outOfBoundsKill = true;
    },
    addStar: function(x, y) {
      var newStar = newGame.add.sprite(x, y, 'yellow_star');
      this.stars.add(newStar);

      newGame.physics.arcade.enable(newStar);
      newStar.body.velocity.x = -200;
      newStar.checkWorldBounds = true;
      newStar.outofBoundsKill = true;
    },

    addPipeRow: function() {
      var opening = Math.floor(Math.random() * 8) + 1;

      this.addStar(600, (opening + Math.floor(Math.random() * 3) + 1) * 45);

      for (var count = 0; count < 16; count++) {
          if (count < opening || count > opening + 3) {
              this.addPipe(600, count * 45 + 10);
          }
      }


    },

    gotStar: function() {
      if (!this.bird.alive) {
        return;
      }
      this.score += 1;
      this.scoreText.text = this.score;

      this.stars.getFirstAlive().destroy();

    },

    pipeCollision: function() {
      if (!this.bird.alive) {
        return;
      }

      this.endOfGame.play();

      this.bird.alive = false;

      newGame.time.events.remove(this.timer);

      this.stars.forEach(function(star) {
        star.body.velocity.x = 0;
      })

      this.pipes.forEach(function(pipe) {
        pipe.body.velocity.x = 0;
      })
    }
};

// var newGame = new Phaser.Game(600, 700);
//
// newGame.state.add('mainState', mainState);
//
// newGame.state.start('mainState');
