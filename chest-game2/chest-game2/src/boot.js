IPP.Boot = function(){};

IPP.Boot.prototype.init = function() {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.game.plugins.add(new Phaser.Plugin.Isometric(this.game));
};

IPP.Boot.prototype.create = function() {
    this.game.state.add("preloader", IPP.Preloader);
    this.game.state.add("game", IPP.Game);
    this.game.state.start("preloader")
};