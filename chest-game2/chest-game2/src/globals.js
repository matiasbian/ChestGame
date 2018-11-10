// main namespace (Isometric Packing Puzzle - IPP)
IPP = {};

IPP.SceneObjects = {
    "ground": {
        points: {
            top: {x: 495, y: 307},
            left: {x: 231, y: 459},
            bottom: {x: 436, y: 576},
            right: {x: 705, y: 422},
        },
        step: 35 // count of points on each side of grid (between top and left, between top and right)
    },
    "ceil": {
        points: {
            top: {x: 495, y: 144},
            left: {x: 231, y: 288},
            bottom: {x: 436, y: 385},
            right: {x: 705, y: 254},
        }
    },
    "book1" : {
        sprite: "book1",
        height: 42,
        points: {
            top: {x: 159, y: 60},
            left: {x: 23, y: 134},
            bottom: {x: 107, y: 180},
            right: {x: 241, y: 102}
        }
    },
    "book2" : {
        sprite: "book2",
        height: 29,
        points: {
            top: {x: 129, y: 48},
            left: {x: 22, y: 108},
            bottom: {x: 87, y: 143},
            right: {x: 190, y: 83}
        }
    },
    "book3" : {
        sprite: "book3",
        height: 58,
        points: {
            top: {x: 155, y: 73},
            left: {x: 22, y: 148},
            bottom: {x: 102, y: 194},
            right: {x: 235, y: 120}
        }
    },
    "cyl" : {
        sprite: "cyl",
        height: 58,
        points: {
            top: {x: 129, y: 57},
            left: {x: 21, y: 123},
            bottom: {x: 55, y: 140},
            right: {x: 160, y: 73}
        }
    },
    "bx" : {
        sprite: "bx",
        height: 125,
        points: {
            top: {x: 130, y: 144},
            left: {x: 22, y: 205},
            bottom: {x: 130, y: 266},
            right: {x: 237, y: 207}
        }
    },
    "flower" : {
        sprite: "flower",
        height: 101,
        points: {
            top: {x: 72, y: 74},
            left: {x: 24, y: 104},
            bottom: {x: 70, y: 130},
            right: {x: 118, y: 99}
        }
    },
    "globe" : {
        sprite: "globe",
        height: 120,
        points: {
            top: {x: 83, y: 90},
            left: {x: 26, y: 126},
            bottom: {x: 84, y: 156},
            right: {x: 144, y: 113}
        }
    },
    "pyramid" : {
        sprite: "pyramid",
        height: 62,
        points: {
            top: {x: 72, y: 50},
            left: {x: 19, y: 80},
            bottom: {x: 72, y: 109},
            right: {x: 122, y: 79}
        }
    },
    "rec-cb" : {
        sprite: "rec-cb",
        height: 61,
        points: {
            top: {x: 168, y: 87},
            left: {x: 32, y: 166},
            bottom: {x: 85, y: 197},
            right: {x: 221, y: 118}
        }
    },
    "smbx" : {
        sprite: "smbx",
        height: 62,
        points: {
            top: {x: 96, y: 90},
            left: {x: 43, y: 120},
            bottom: {x: 96, y: 148},
            right: {x: 148, y: 120}
        }
    }
}

IPP.intersects = function(v1, v2) {
    var det, gamma, lambda;
    det = (v1.p2.x - v1.p1.x) * (v2.p2.y - v2.p1.y) - (v2.p2.x - v2.p1.x) * (v1.p2.y - v1.p1.y);
    if (det === 0) {
        return false;
    } else {
        lambda = ((v2.p2.y - v2.p1.y) * (v2.p2.x - v1.p1.x) + (v2.p1.x - v2.p2.x) * (v2.p2.y - v1.p1.y)) / det;
        gamma = ((v1.p1.y - v1.p2.y) * (v2.p2.x - v1.p1.x) + (v1.p2.x - v1.p1.x) * (v2.p2.y - v1.p1.y)) / det;
        return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
    }
}