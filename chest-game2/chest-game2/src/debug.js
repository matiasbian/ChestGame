IPP.Debug = function(game) {
    this.game = game;
    this.graphics = this.game.add.graphics(0, 0);
    this.dGround = false;
    this.gObjects = false;
};

IPP.Debug.prototype.drawGround = function(grid) {
    if (this.dGround) {
        this.graphics.clear();
        this.dGround = false;
    } else {
        this.dGround = true;
        this.graphics.lineStyle(0, 0x00ff00, 0);
        for (var i = 0; i < grid.length; i++) {
            this.drawPoint(grid[i].x, grid[i].y, 4, 0xff0000);
        }
    }
};

IPP.Debug.prototype.drawObjectsGround = function(list) {
    if (this.dObjects) {
        for (var i = 0; i < list.length; i++) {
            list[i].children[0].clear();
        }
        this.dObjects = false;
    } else {
        this.dObjects = true;
        for (var i = 0; i < list.length; i++) {
            var points = list[i].data.points;
            for (var p in points) {
                list[i].children[0].beginFill(0x29DF08);
                list[i].children[0].drawCircle(points[p].x, points[p].y, 4);
                list[i].children[0].endFill(); 
            }
            
        }
    }
};

IPP.Debug.prototype.drawPoint = function(x, y, radius, color) {
    this.graphics.beginFill(color);
    this.graphics.drawCircle(x, y, radius);
    this.graphics.endFill();
}

IPP.Debug.prototype.drawLine = function(x1, y1, x2, y2, color, thickness) {
    this.graphics.lineStyle(thickness, color, 1);
    this.graphics.setTo(x1, y1);
    this.graphics.lineTo(x2, y2);
}

IPP.Debug.prototype.drawDropZone = function(zone) {
    this.graphics.lineStyle(2, 0x00ff00, 1);
    for (var i = 0; i < zone.length; i++) {
        var vector = zone[i];
        this.graphics.moveTo(vector.p1.x, vector.p1.y);
        this.graphics.lineTo(vector.p2.x, vector.p2.y);
    }
}