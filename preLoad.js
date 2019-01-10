
var PreloadState = {
  init: function() {
    newGame.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    newGame.scale.pageAlignHorizontally = true;
    newGame.scale.pageAlignVertically = true;
  },

  preload: function() {
    this.mainPic = newGame.add.sprite(newGame.world.centerX, newGame.world.centerY, 'main_pic');
    this.mainPic.anchor.setTo(0.5);

    this.loadingBar = newGame.add.sprite(newGame.world.centerX, newGame.world.centerY + 175, 'loading_bar');
    this.loadingBar.anchor.setTo(0.5);

    newGame.load.setPreloadSprite(this.loadingBar);
  },

  create: function() {

    newGame.stage.backgroundColor = '#71c5cf';
    //newGame.state.start('HomeState');
  }
}
