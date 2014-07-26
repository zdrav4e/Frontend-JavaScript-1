"use strict";
var allowedDirs = ["up", "down"];
var moveWith = 10;

function Wall(leftX, rightX, topY, bottomY) {
  var leftX = leftX,
      rightX = rightX,
      topY = topY,
      bottomY = bottomY;

  this.getXY = function() {
    return {
      "leftX" : leftX,
      "rightX" : rightX,
      "topY" : topY,
      "bottomY" : bottomY
    };
  }
}

function Pad(x, y, name) {
  var leftX = x,
      topY = y,
      width = 20,
      height = 70,
      rightX = x + width,
      bottomY = y + height,
      moveWith = 10,
      hits = 0,
      name = name;

  var allowedDirs = ["up", "down"];

  var move = function(dir) {
    if ((topY <= 0 && dir === "up") || ( bottomY >= canvas.height && dir === "down")) {
      return;
    }
    if (dir === "up") {
      topY = topY - moveWith;
      bottomY = bottomY - moveWith;
    }
    if (dir === "down") {
      topY = topY + moveWith;
      bottomY = bottomY + moveWith;
    }
  }

  var print = function (context) {
    context.fillRect(leftX, topY, width, height);
  }

  var hit = function () {
    hits++;
    return hits;
  }

  var getXY = function() {
    return {
      'leftX' : leftX,
      'rightX' : rightX,
      'topY' : topY,
      'bottomY' : bottomY
    };
  }

  return {
    move : move,
    print : print,
    getXY : getXY,
    hit : hit,
    name : name
  }
}

function Pong(x, y) {

  var centerX = x, centerY = y, radius = 10;
  var deltaX = 5, deltaY = 2;

  var hitpad = function (pad) {
    //var pad = window.playerPad.getXY();
    return intersect(getXY(), pad);
  }

  var hitTopBottomWall = function () {
     var c = getXY();
     return intersect(c, topwall.getXY()) || intersect(c, bottomwall.getXY());
  }

  var hitLeftRightWall = function() {
    var c = getXY();
    return intersect(c, leftwall.getXY()) || intersect(c, rightwall.getXY());
  }

  var move = function () {
    centerX += deltaX;
    centerY += deltaY;

    if (hitpad(playerPad.getXY()) || hitpad(pcPad) || hitLeftRightWall()) {
      if (hitpad(playerPad.getXY())) {
        if (playerPad.hit() === gamepoints) {
          gameover(playerPad);
        }
      }
      if (hitpad(pcPad)) {
        if (pcPad.hit() === gamepoints) {
          gameover(pcPad);
        }
      }

      deltaX = -deltaX;
    }
    if (hitTopBottomWall()) {
      deltaY = -deltaY;
    }
  }

  var print = function(context) {
      context.beginPath();
      context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
      context.fillStyle = 'green';
      context.closePath();
      context.fill();
  };

  var getXY = function() {
    return {'x' : centerX, 'y' : centerY, 'r' : radius};
  }

  return {
    print : print,
    move : move
  }
}

window.Pong = Pong;
window.Pad = Pad;
window.Wall = Wall;

function intersect(circle, rect) {
  var circleDistance = [];
  circleDistance.closestX = _.min([Math.abs(circle.x - rect.leftX), Math.abs(circle.x - rect.rightX)]);
  circleDistance.closestY = _.min([Math.abs(circle.y - rect.topY), Math.abs(circle.y - rect.bottomY)]);

  if ( ( (rect.leftX <= circle.x && circle.x <= rect.rightX ) || (circleDistance.closestX <= circle.r)) &&
    ( (rect.topY <= circle.y && circle.y <= rect.bottomY ) || (circleDistance.closestY <= circle.r)) ) {
    return true;
  }
  return false;
}
