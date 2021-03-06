WebFontConfig = {
    active: function() { newGame.time.events.add(Phaser.Timer.SECOND, initializeText, this);},
    google: {
      families: ['Righteous']
    }
};

var loadingScreenText = null;
var totalScore = 0;
var highScore = 0;

function preloadWebFont() {
    newGame.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
}

function initializeText() {
  loadingScreenText.text = "";
  var startGameFunc = function() {
    newGame.state.start('MainState');
  }

  var creditsFunc = function() {
    newGame.state.start('CreditState');
  }

  var button1 = newGame.add.button(newGame.world.centerX - 120, newGame.world.centerY + 130, 'button1', startGameFunc);
  button1.anchor.setTo(0.5);

  var button2 = newGame.add.button(newGame.world.centerX + 120, newGame.world.centerY + 130, 'button1', creditsFunc);
  button2.anchor.setTo(0.5);

  var titleTextPt1 = newGame.add.text(newGame.world.centerX, newGame.world.centerY - 200, "FLAPPY BIRD",
      {font: "80px Righteous", fill: "#ffffff"});
  var titleTextPt2 = newGame.add.text(newGame.world.centerX, newGame.world.centerY - 135, "SPACE EDITION",
      {font: "40px Righteous", fill: "#ffffff"});
  var playButton = newGame.add.text(newGame.world.centerX - 120, newGame.world.centerY + 130, "PLAY",
      {font: "50px Righteous", fill: "#ffffff"});

  var creditsButton = newGame.add.text(newGame.world.centerX + 120, newGame.world.centerY + 130, "CREDITS",
      {font: "40px Righteous", fill: "#ffffff"});

  titleTextPt1.anchor.setTo(0.5);
  titleTextPt2.anchor.setTo(0.5);
  playButton.anchor.setTo(0.5);
  creditsButton.anchor.setTo(0.5);
}

var CreditState = {
  init: function() {
    newGame.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    newGame.scale.pageAlignHorizontally = true;
    newGame.scale.pageAlignVertically = true;
  },

  preload: function() {
    this.background = newGame.add.sprite(270, 350, 'background');
    this.background.anchor.setTo(0.5);
  },

  create: function() {
    var backButton = newGame.add.button(newGame.world.centerX, newGame.world.centerY + 150, 'button1', this.goHome);
    backButton.anchor.setTo(0.5);
    var backButtonText = newGame.add.text(newGame.world.centerX, newGame.world.centerY + 150, "BACK",
        {font: "50px Righteous", fill: "#ffffff"});
    backButtonText.anchor.setTo(0.5);

    
  },

  goHome: function() {
    newGame.state.start('HomeState');
  }
}


var BootState = {
  init: function() {
    newGame.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    newGame.scale.pageAlignHorizontally = true;
    newGame.scale.pageAlignVertically = true;
  },

  preload: function() {
    newGame.load.image('loading_bar', 'assets/images/loading_bar.jpg');
    newGame.load.image('main_pic', 'assets/images/flappy_bird_yellow.png');
    newGame.load.image('background', 'assets/images/space_background.jpg');
  },

  create: function() {
    newGame.state.start('PreloadState');
  }
}


var PreloadState = {
  init: function() {
    newGame.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    newGame.scale.pageAlignHorizontally = true;
    newGame.scale.pageAlignVertically = true;
  },

  preload: function() {
    newGame.load.audio('jump', 'assets/sounds/jump.wav');
    newGame.load.audio('end_of_game', 'assets/sounds/end_of_game.wav');
    newGame.load.image('flappy_bird_yellow', 'assets/images/flappy_bird.png');
    newGame.load.image('purple_pipe', 'assets/images/purple_pipe.png');
    newGame.load.image('purple_pipe_end', 'assets/images/purple_pipe_end.png');
    newGame.load.image('yellow_star', 'assets/images/yellow_star_final.png');
    newGame.load.image('button1', 'assets/images/button1.png');
    newGame.load.audio('jump', 'assets/sounds/jump.wav');
    newGame.load.audio('end_of_game', 'assets/sounds/end_of_game.wav');

    this.background = newGame.add.sprite(270, 350, 'background');
    this.background.anchor.setTo(0.5);

    this.mainPic = newGame.add.sprite(newGame.world.centerX, newGame.world.centerY - 25, 'main_pic');
    this.mainPic.anchor.setTo(0.5);

    this.loadingBar = newGame.add.sprite(newGame.world.centerX, newGame.world.centerY + 175, 'loading_bar');
    this.loadingBar.anchor.setTo(0.5);

    newGame.load.setPreloadSprite(this.loadingBar);
  },

  create: function() {
    newGame.state.start('HomeState');
  }
}

var HomeState = {
  preload: function() {
    preloadWebFont();
  },
  create: function() {
    this.background = newGame.add.sprite(270, 350, 'background');
    this.background.anchor.setTo(0.5);
    loadingScreenText = newGame.add.text(newGame.world.centerX, newGame.world.centerY + 50, "Loading...",
        {font: "60px Arial", fill: "#ffffff"});
    loadingScreenText.anchor.setTo(0.5);
  }
}

var MainState = {
    preload: function() {
    },

    create: function() {
      this.background = newGame.add.sprite(270, 350, 'background');
      this.background.anchor.setTo(0.5);
      this.score = 0;
      this.scoreText = newGame.add.text(newGame.world.centerX, newGame.world.centerY - 225, "0",
                  { font: "90px Righteous", fill: "#ffffff" });

      newGame.world.bringToTop(this.scoreText);
      // newGame.stage.backgroundColor = '#71c5cf'
      this.flappingNoise = newGame.add.audio('jump');
      this.endOfGame = newGame.add.audio('end_of_game');

      this.pipes = newGame.add.group();
      this.stars = newGame.add.group();
      this.bird = newGame.add.sprite(100, 245, 'flappy_bird_yellow');
      this.bird.anchor.setTo(-0.2, 0.5);

      newGame.physics.startSystem(Phaser.Physics.ARCADE);
      newGame.physics.arcade.enable(this.bird);
      this.timer = newGame.time.events.loop(1350, this.addPipeRow, this);

      this.bird.body.gravity.y = 1500;

      var spaceKey = newGame.input.keyboard.addKey(
                      Phaser.Keyboard.SPACEBAR);
      spaceKey.onDown.add(this.flyUp, this);
      newGame.input.onDown.add(this.flyUp, this);
    },

    update: function() {

        if (this.bird.y > 690) {
          totalScore = this.score;
          highScore = Math.max(this.score, highScore);
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
      this.bird.body.velocity.y = -450;
      var tiltAnimation = newGame.add.tween(this.bird);

      tiltAnimation.to({angle: -10}, 500);
      tiltAnimation.start();
      this.flappingNoise.play();
    },

    gameOver: function() {
      newGame.state.start('GameOverState');
    },

    addPipeEnd: function(x, y) {
      var newPipeEnd = newGame.add.sprite(x, y, 'purple_pipe_end');
      this.pipes.add(newPipeEnd);

      newGame.physics.arcade.enable(newPipeEnd);

      newPipeEnd.body.velocity.x = -275;

      newPipeEnd.checkWorldBounds = true;
      newPipeEnd.outOfBoundsKill = true;
    },

    addPipe: function(x, y) {
      var newPipe = newGame.add.sprite(x, y, 'purple_pipe');

      this.pipes.add(newPipe);

      newGame.physics.arcade.enable(newPipe);

      newPipe.body.velocity.x = -275;

      newPipe.checkWorldBounds = true;
      newPipe.outOfBoundsKill = true;
    },
    addStar: function(x, y) {
      var newStar = newGame.add.sprite(x, y, 'yellow_star');
      this.stars.add(newStar);

      newGame.physics.arcade.enable(newStar);
      newStar.body.velocity.x = -275;
      newStar.checkWorldBounds = true;
      newStar.outofBoundsKill = true;

    },

    addPipeRow: function() {
      var opening = Math.floor(Math.random() * 7) + 1;

      this.addStar(620, (opening + Math.random() * 2) * 64 + 15);
      this.addPipeEnd(595, (opening) * 64);
      this.addPipeEnd(595, (opening + 3) * 64);

      for (var count = 0; count < 11; count++) {
          if (count < opening) {
            this.addPipe(600, count * 64);
          } else if (count > opening + 2) {
            this.addPipe(600, count * 64 + 15);
          }
      }


      newGame.world.bringToTop(this.scoreText);
    },

    gotStar: function(bird, star) {
      if (!this.bird.alive) {
        return;
      }
      this.score += 1;
      this.scoreText.text = this.score;

      this.stars.remove(star);
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

var GameOverState = {

  create: function() {
    this.background = newGame.add.sprite(270, 350, 'background');
    this.background.anchor.setTo(0.5);

    gameOverText = newGame.add.text(newGame.world.centerX, newGame.world.centerY - 180, "GAME OVER",
          {font: "90px Righteous", fill: "#ffffff"});
    gameOverText.anchor.setTo(0.5);

    yourScoreText = newGame.add.text(newGame.world.centerX - 120, newGame.world.centerY - 55, "Your Score",
          {font: "25px Righteous", fill: "#ffffff"});
    yourScoreText.anchor.setTo(0.5);

    scoreText = newGame.add.text(newGame.world.centerX - 120, newGame.world.centerY - 5, totalScore,
          {font: "40px Righteous", fill: "#ffffff"});
    scoreText.anchor.setTo(0.5);

    yourHighScoreText = newGame.add.text(newGame.world.centerX + 120, newGame.world.centerY - 55, "High Score",
          {font: "25px Righteous", fill: "#ffffff"});
    yourHighScoreText.anchor.setTo(0.5);

    highScoreText = newGame.add.text(newGame.world.centerX + 120, newGame.world.centerY - 5, highScore,
          {font: "40px Righteous", fill: "#ffffff"});
    highScoreText.anchor.setTo(0.5);

    this.playButton = newGame.add.button(newGame.world.centerX - 120, newGame.world.centerY + 135, 'button1', this.startGame, this);
    this.playButton.anchor.setTo(0.5);
    var playButtonText = newGame.add.text(newGame.world.centerX - 120, newGame.world.centerY + 135, 'PLAY',
          {font: "50px Righteous", fill: "#ffffff"});
    playButtonText.anchor.setTo(0.5);

    this.homeButton = newGame.add.button(newGame.world.centerX + 120, newGame.world.centerY + 135, 'button1', this.goHome, this);
    this.homeButton.anchor.setTo(0.5);
    var homeButtonText = newGame.add.text(newGame.world.centerX + 120, newGame.world.centerY + 135, 'HOME',
          {font: "50px Righteous", fill: "#ffffff"});
    homeButtonText.anchor.setTo(0.5);
  },

  startGame: function() {
    newGame.state.start('MainState');
  },

  goHome: function() {
    newGame.state.start('HomeState');
  }
}

var newGame = new Phaser.Game(600, 700);

newGame.state.add('MainState', MainState);
newGame.state.add('HomeState', HomeState);
newGame.state.add('BootState', BootState);
newGame.state.add('PreloadState', PreloadState);
newGame.state.add('GameOverState', GameOverState);
newGame.state.add('CreditState', CreditState);

newGame.state.start('BootState');
