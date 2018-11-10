IPP.Preloader = function() {};

IPP.Preloader.prototype.create = function() {
    this.load.onLoadComplete.add(this.complete, this);

    this.load.image("background", "assets/images/background.jpg");
    this.load.image("chest", "assets/images/chest.png");
    this.load.image("chest-front", "assets/images/chest-front.png");
    this.load.image("dust", "assets/images/dust.png");

    this.load.image("book1", "assets/images/objects/book1.png");
    this.load.image("book2", "assets/images/objects/book2.png");
    this.load.image("book3", "assets/images/objects/book3.png");
    this.load.image("bx", "assets/images/objects/bx.png");
    this.load.image("cyl", "assets/images/objects/cyl.png");
    this.load.image("flower", "assets/images/objects/flower.png");
    this.load.image("globe", "assets/images/objects/globe.png");
    this.load.image("pyramid", "assets/images/objects/pyramid.png");
    this.load.image("rec-cb", "assets/images/objects/rec-cb.png");
    this.load.image("smbx", "assets/images/objects/smbx.png");

    this.load.start();
};

IPP.Preloader.prototype.complete = function() {
    this.game.state.start("game");
}