define(function(){

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

  return Pad;
});
