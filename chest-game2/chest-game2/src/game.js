IPP.Game = function(){
    this.chest = null;
    this.objects = [];
    this.grid = [];

    this.debug = null;

    this.dropPolygon = null;

    this.map = [
        {name: "book1", x: 122, y: 530},
        {name: "book2", x: 977, y: 163},
        {name: "book3", x: 753, y: 526},
        {name: "cyl", x: 156, y: 390},
        {name: "bx", x: 1019, y: 274},
        {name: "flower", x: 1106, y: 562},
        {name: "globe", x: 391, y: 558},
        {name: "pyramid", x: 977, y: 480},
        {name: "rec-cb", x: 791, y: 70},
        {name: "smbx", x: 4, y: 467}
    ];
    this.group = null;
    this.dragGroup = null;
    this.win = null;
}

IPP.Game.prototype.create = function() {
    this.game.add.sprite(0, 0, "background");
    this.chest = this.game.add.sprite(199, 53, "chest");
    this.chest.data.points = IPP.SceneObjects["ground"].points;
    this.group = this.game.add.group();
    var front = this.game.make.sprite(217 + 199, 245 + 53, "chest-front");
    front.data.h = 1000;
    front.data.groundY = this.game.height;
    this.group.addChild(front);
    this.debug = new IPP.Debug(this.game);
    this.createObjects(this.map);
    this.dragGroup = this.game.add.group();
    this.game.add.sprite(0, 0, "dust");
    
    this.createDropPolygon();

    key1 = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    key1.onUp.add(this._drawGround, this);

    key2 = this.game.input.keyboard.addKey(Phaser.Keyboard.TWO);
    key2.onUp.add(this._drawObjectsGround, this);

    key3 = this.game.input.keyboard.addKey(Phaser.Keyboard.THREE);
    key3.onUp.add(this._drawDropZone, this);

    this.generateGridPoints(this.chest.x, this.chest.y);    
    this.createWinOverlay();
}

IPP.Game.prototype.createWinOverlay = function() {
    this.win = this.game.add.graphics(0, 0);
    this.win.beginFill(0x000000, 0.65);
    this.win.drawRect(0, 0, this.game.width, this.game.height);
    this.win.endFill();

    var winText = this.game.add.text(0, 0, "Congratulations!", {
        font: "bold 100px Arial",
        fill: "#ffffff"
    });    
    this.win.addChild(winText);
    winText.x = this.game.width / 2 - winText.width / 2;
    winText.y = this.game.height / 2 - winText.height / 2;    
    this.win.visible = false;
}

IPP.Game.prototype.createDropPolygon = function() {
    this.dropPolygon = [];
    var ceil = IPP.SceneObjects["ceil"].points;
    var ground = IPP.SceneObjects["ground"].points;
    //P1-P2
    var vector = {
        p1: {x: ceil.top.x + this.chest.x, y: ceil.top.y + this.chest.y},
        p2: {x: ceil.right.x + this.chest.x, y: ceil.right.y + this.chest.y}
    }
    this.dropPolygon.push(vector);
    // P2-P3
    vector = {
        p1: {x: ceil.right.x + this.chest.x, y: ceil.right.y + this.chest.y + 1},
        p2: {x: ground.right.x + this.chest.x, y: ground.right.y + this.chest.y}
    }
    this.dropPolygon.push(vector);
    //P3-P4
    vector = {
        p1: {x: ground.right.x + this.chest.x, y: ground.right.y + this.chest.y + 1},
        p2: {x: ground.bottom.x + this.chest.x, y: ground.bottom.y + this.chest.y}
    }
    this.dropPolygon.push(vector);
    //P4-P5
    vector = {
        p1: {x: ground.bottom.x + this.chest.x, y: ground.bottom.y + this.chest.y - 1},
        p2: {x: ground.left.x + this.chest.x, y: ground.left.y + this.chest.y}
    }
    this.dropPolygon.push(vector);
    //P5-P6
    vector = {
        p1: {x: ground.left.x + this.chest.x, y: ground.left.y + this.chest.y - 1},
        p2: {x: ceil.left.x + this.chest.x, y: ceil.left.y + this.chest.y} 
    }
    this.dropPolygon.push(vector);
    //P6-P1
    vector = {
        p1: {x: ceil.left.x + this.chest.x, y: ceil.left.y + this.chest.y - 1},
        p2: {x: ceil.top.x + this.chest.x, y: ceil.top.y + this.chest.y - 1}
    }
    this.dropPolygon.push(vector);
};

IPP.Game.prototype._drawDropZone = function() {
    this.debug.drawDropZone(this.dropPolygon);
}

IPP.Game.prototype._drawGround = function() {
    this.debug.drawGround(this.grid);
}

IPP.Game.prototype._drawObjectsGround = function() {
    this.debug.drawObjectsGround(this.objects);
}

IPP.Game.prototype.spriteDown = function(sprite) {
    var sprites = this.getSpritesOnPosition(sprite);
    var h = sprite.data.h;
    var isTop = true;
    for (var i = 0; i < sprites.length; i++) {
        if (sprites[i].data.h > h) {
            isTop = false;
            break;
        }
    }
    if (isTop) {
        sprite.input.enableDrag(true, false);
    } else {
        sprite.input.disableDrag();
    }
}

IPP.Game.prototype.createObjects = function(data) {
    for (var i = 0; i < data.length; i++) {
        var objData = IPP.SceneObjects[data[i].name];
        var sprite = this.game.make.sprite(data[i].x, data[i].y, objData.sprite);
        sprite.data.height = objData.height;
        sprite.data.points = objData.points;
        sprite.data.h = 0;
        sprite.data.id = data[i].name;
        sprite.data.groundIndexes = [];
        sprite.data.originX = data[i].x;
        sprite.data.originY = data[i].y;
        sprite.data.groundY = 0;
        sprite.data.groundX = 0;
        sprite.data.isInBox = false;
        sprite.inputEnabled = true;
        sprite.input.pixelPerfectClick = true;
       
        sprite.events.onInputDown.add(this.spriteDown, this);
        sprite.events.onDragStart.add(this.dragStart, this);
        sprite.events.onDragStop.add(this.dragStop, this);

        this.objects.push(sprite);

        var graphics = this.game.make.graphics(0, 0);
        sprite.addChild(graphics);
        this.group.addChild(sprite);
    }
};

IPP.Game.prototype.dragStart = function(dragSprite, pointer) {
    this.dragGroup.addChild(dragSprite);
    dragSprite.data.h = 0;
    dragSprite.data.groundX = 0;
    dragSprite.data.groundY = 0;
    dragSprite.data.groundIndexes = [];
    dragSprite.data.isInBox = false;
};

IPP.Game.prototype.makePolygonFromObject = function(sprite) {
    var spritePolygon =  [];
    var points = sprite.data.points;
    //P1-P2
    var vector = {
        p1: {x: points.top.x + sprite.x, y: points.top.y + sprite.y},
        p2: {x: points.right.x + sprite.x, y: points.right.y + sprite.y}
    }
    spritePolygon.push(vector);
    //P2-P3
    vector = {
        p1: {x: points.right.x + sprite.x, y: points.right.y + sprite.y},
        p2: {x: points.bottom.x + sprite.x, y: points.bottom.y + sprite.y}
    }
    spritePolygon.push(vector);
    //P3-P4
    vector = {
        p1: {x: points.bottom.x + sprite.x, y: points.bottom.y + sprite.y},
        p2: {x: points.left.x + sprite.x, y: points.left.y + sprite.y}
    }
    spritePolygon.push(vector);
    //P4-P1
    vector = {
        p1: {x: points.left.x + sprite.x, y: points.left.y + sprite.y},
        p2: {x: points.top.x + sprite.x, y: points.top.y + sprite.y}
    }
    spritePolygon.push(vector);
    return spritePolygon;
};

IPP.Game.prototype.dragStop = function(dragSprite, pointer) {
    var dropX, dropY, nearestPoint;
    this.group.addChild(dragSprite);
    var isInsideDropZone = this.isObjectInsidePolygon(this.dropPolygon, dragSprite);

    if (isInsideDropZone) {
        dragSprite.data.isInBox = true;
        var groundPolygon = this.makePolygonFromObject(this.chest);
        dropX = dragSprite.x + dragSprite.data.points.top.x;
        dropY = dragSprite.y + dragSprite.data.points.top.y;
        var isInsideGround = this.isObjectInsidePolygon(groundPolygon, dragSprite);
        if (isInsideGround) {
            nearestPoint = this.findNearestPoint(dropX, dropY);
        } else {
            while(!this.isPointInsidePolygon(groundPolygon, {x: dropX, y: dropY})) {
                dropY += 1;
            }
            nearestPoint = this.findNearestPoint(dropX, dropY);
        }        
        
        var polygon = this.makePolygonFromObject(dragSprite);
        var pointsIndexes = this.getGridPointsInsidePolygon(polygon);
        dragSprite.data.groundIndexes = pointsIndexes;
        
        // TODO: if this list contain only one object that higher then current object height - ignore
        var objectsBelow = this.getSpritesOnPosition(dragSprite);

        dragSprite.data.groundX = nearestPoint.x;
        dragSprite.data.groundY = nearestPoint.y;

        var h = 0;
        var height = 0;
        for (var i = 0; i < objectsBelow.length; i++) {
            if (objectsBelow[i].data.h > h) {
                h = objectsBelow[i].data.h;
            }
        }
        for (var i = 0; i < objectsBelow.length; i++) {
            if (objectsBelow[i].data.h === h) {
                if (objectsBelow[i].data.height > height) {
                    height = objectsBelow[i].data.height;
                }
                
            }
        }
        dragSprite.data.h = h + height;

        dragSprite.x = dragSprite.data.groundX - dragSprite.data.points.top.x;
        dragSprite.y = dragSprite.data.groundY - dragSprite.data.points.top.y - dragSprite.data.h;

        // depth sorting
        this.group.children.sort(function(a, b) {
                if (a.data.h > b.data.h) {
                    return 1;
                } else if (a.data.h < b.data.h) {
                    return -1;
                } else {
                    
                    var aTopX = a.data.points.top.x + a.x;
                    var aTopY = a.data.points.top.y + a.y;
                    var bTopX = b.data.points.top.x + b.x;
                    var bTopY = b.data.points.top.y + b.y;
                    var distanceA = this.getDistanceBetweenPoints({x: aTopX, y: aTopY}, {x: this.game.width / 2, y: 0});
                    var distanceB = this.getDistanceBetweenPoints({x: bTopX, y: bTopY}, {x: this.game.width / 2, y: 0});
                    return distanceA - distanceB;
                }            
        }.bind(this));
    } else {
        dragSprite.x = dragSprite.data.originX;
        dragSprite.y = dragSprite.data.originY;
    }
    this.checkPuzzleDone();
};

IPP.Game.prototype.getDistanceBetweenPoints = function(p1, p2) {
    var dx = Math.abs(p1.x - p2.x);
    var dy = Math.abs(p1.y - p2.y);
    return (dx * dx + dy * dy);
};

IPP.Game.prototype.getObjectsSummaryHeight = function() {
    var height = 0;
    for (var i = 0; i < this.objects.length; i++) {
        var obj = this.objects[i];
        if (obj.data.isInBox) {
            if (obj.data.h + obj.data.height > height) {
                height = obj.data.h + obj.data.height;
            }
        }
    }
    return height;
};

IPP.Game.prototype.checkPuzzleDone = function() {
    var isAllObjectsInBox = true;
    for (var i = 0; i < this.objects.length; i++) {
        if (!this.objects[i].data.isInBox) {
            isAllObjectsInBox = false;
            break;
        }
    }
    if (isAllObjectsInBox) {
        var height = this.getObjectsSummaryHeight();
        var boxHeight = IPP.SceneObjects["ground"].points.top.y - IPP.SceneObjects["ceil"].points.top.y;
        if (height <= boxHeight) {
            this.win.visible = true;
        } else {
            console.log("=============        FAIL             ===============");
        }
    }
};

IPP.Game.prototype.getSpritesOnPosition = function(sprite) {
    var sprites = [];
    var spriteIndexes = sprite.data.groundIndexes;
    for (var i = 0; i < this.objects.length; i++) {
        if (this.objects[i].data.id !== sprite.data.id) {
            var indexes = this.objects[i].data.groundIndexes;
            if (indexes.length) {
                for (var k = 0; k < indexes.length; k++) {
                    if (spriteIndexes.indexOf(indexes[k]) !== -1) {
                        sprites.push(this.objects[i]);
                        break;
                    }
                }
            }
        }
    }
    return sprites;
};

IPP.Game.prototype.getGridPointsInsidePolygon = function(polygon) {
    var points = [];
    for (var i = 0; i < this.grid.length; i++) {
        if (this.isPointInsidePolygon(polygon, this.grid[i])) {
            points.push(i);
        }
    }
    /*for (var i = 0; i < points.length; i++) {
        var index = points[i];
        this.debug.drawPoint(this.grid[index].x, this.grid[index].y, 2, 0xffff00);
    }*/
    return points;
};

IPP.Game.prototype.getPolygonBorderPoint = function(polygon, type) {
    var point = {x: polygon[0].p1.x, y: polygon[0].p1.y};
    for (var i = 0; i < polygon.length; i++) {
        var vector = polygon[i];
        for (var p in vector) {
            if (type === "TOP") {
                if (vector[p].y < point.y) {
                    point.x = vector[p].x;
                    point.y = vector[p].y;
                }
            } else if (type === "BOTTOM") {
                if (vector[p].y > point.y) {
                    point.x = vector[p].x;
                    point.y = vector[p].y;
                }
            }            
        }        
    }
    return point;
}

IPP.Game.prototype.isPointInsidePolygon = function(polygon, point) {
    var currentIntersectionCount = 0;
    var vectorObj = {
        p1: point,
        p2: {x: point.x + 5000, y: point.y}
    }
    var top = this.getPolygonBorderPoint(polygon, "TOP");
    var bottom = this.getPolygonBorderPoint(polygon, "BOTTOM");
    if (point.y === (top.y) && point.x !== top.x) {
        return false;
    }
    if (point.y === bottom.y && point.x !== bottom.x) {
        return false;
    }
    for (var i = 0; i < polygon.length; i++) {
        var vector = polygon[i];        
        if (IPP.intersects(vectorObj, vector)) {
            currentIntersectionCount++;
        }
    }
    if (currentIntersectionCount === 1) {
        return true;
    }
    return false;
};

IPP.Game.prototype.isObjectInsidePolygon = function(polygon, sprite) {
    var intersections = [];
    var points = sprite.data.points;        
        for (var p in points) {
            var currentIntersectionCount = 0;
            var vectorObj = {
                p1: {x: points[p].x + sprite.x, y: points[p].y + sprite.y},
                p2: {x: points[p].x + sprite.x + 5000, y: points[p].y + sprite.y}
            }
            for (var i = 0; i < polygon.length; i++) {
                var vector = polygon[i];                
                if (IPP.intersects(vectorObj, vector)) {
                    currentIntersectionCount++;
                }
            }
            intersections.push(currentIntersectionCount);
        }
    var isInside = true;
    for (var i = 0; i < intersections.length; i++) {
        if (intersections[i] !== 1) {
            isInside = false;
            break;
        }
    }
    return isInside;
};

IPP.Game.prototype.findNearestPoint = function(x, y) {
    var distance = -1;
    var pi = 0;

    for (var i = 0; i < this.grid.length; i++) {
        // first point, so no current distance
        if (distance === -1) {
            var dx = Math.abs(x - this.grid[i].x);
            var dy = Math.abs(y - this.grid[i].y);
            distance = dx * dx + dy * dy;
            pi = i;
        } else {
            var dx = Math.abs(x - this.grid[i].x);
            var dy = Math.abs(y - this.grid[i].y);
            var tmp = dx * dx + dy * dy;
            if (tmp < distance) {
                distance = tmp;
                pi = i;
            }
        }
    }
    return this.grid[pi];
};

IPP.Game.prototype.generateGridPoints = function(x, y) {
    var data = IPP.SceneObjects["ground"];
    var stepLeft = {};
    stepLeft.x = (data.points.top.x - data.points.left.x) / data.step;
    stepLeft.y = (data.points.left.y - data.points.top.y) / data.step;
    var stepRight = {};
    stepRight.x = (data.points.right.x - data.points.top.x) / data.step;
    stepRight.y = (data.points.right.y - data.points.top.y) / data.step;
    var rightPoints = [];
    for (var i = 0; i < data.step; i++) {
        var point = {
            x: data.points.top.x + x + stepRight.x * i,
            y: data.points.top.y + y + stepRight.y * i
        }
        rightPoints.push(point);
    }
    var leftPoints = [];
    for (var i = 0; i < rightPoints.length; i++) {
        for (var j = 1; j < data.step; j++) {
            var point = {
                x: rightPoints[i].x - stepLeft.x * j,
                y: rightPoints[i].y + stepLeft.y * j
            }
            leftPoints.push(point);
        }
    }
    this.grid = this.grid.concat(rightPoints);
    this.grid = this.grid.concat(leftPoints);
};