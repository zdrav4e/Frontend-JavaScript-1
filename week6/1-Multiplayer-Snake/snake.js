$(document).ready(function(){
  "use strict";

var canvas = document.getElementById("snakeCanvas"),
      canvasWidth = canvas.width,
      canvasHeight = canvas.height,
      keyCodeToDirectionTable = {
        37: "left",
        38: "up",
        39: "right",
        40: "down"
      },
      directionsArray = ["left", "up", "right", "down"],
      reverse = {"up" : "down", "down" : "up", "left" : "right", "right" : "left"},
      gameid;

      serverUrl = "http://localhost:3000",
      isHost = false;

  window.tileWidth = 10;
  window.context = canvas.getContext("2d");

  function Tile(x, y, size, ctx) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.print = function() {
      ctx.fillRect(this.x, this.y, this.size, this.size);
    };

    this.equal = function(tile) {
      return tile.x === this.x && tile.y === this.y && tile.size === this.size;
    };
  }

  window.Tile = Tile;

  function Snake(name, x, y, color, ctx) {

    var dir = "down", prevDir = "down";

    var name = name;

    var tiles = [
      new Tile(x, y, tileWidth, ctx),
      new Tile(x, y - 10, tileWidth, ctx),
      new Tile(x, y - 20, tileWidth, ctx)
    ];

    var getName = function () {
      return name;
    }

    var changeDir = function(d) {
      //Reverse not allowed with arrow keys
      if (reverse[dir] === d) {
        return;
      }
      //Don't hitself after pause
      if (dir === "stop" && reverse[prevDir] === d) {
        dir = prevDir;
        return;
      }
      if (dir === "reverse") {
        dir = reverse[prevDir];
        tiles.reverse();
        return;
      }

      prevDir = dir;
      dir = d;
    };

    var getDir = function() {
      return dir;
    };

    var eat = function() {
      var firstTile = tiles[0], newTile;
      switch (dir) {
        case "up":
          newTile = new Tile(firstTile.x, firstTile.y - tileWidth , tileWidth, ctx);
          break;
        case "down":
          newTile = new Tile(firstTile.x, firstTile.y + tileWidth , tileWidth, ctx);
          break;
        case "left":
          newTile = new Tile(firstTile.x - tileWidth, firstTile.y, tileWidth, ctx);
          break;
        case "right":
          newTile = new Tile(firstTile.x + tileWidth, firstTile.y, tileWidth, ctx);
          break;
      }
      tiles.unshift(newTile);
    };

    var hitself = function() {
      var head = tiles[0],
          hit = false;
      tiles.forEach(function(tile, index) {
        if (index !== 0 && head.equal(tile)) {
          hit = true;
        }
      });
      return hit;
    };

    var move = function() {
      var firstTile = tiles[0], newTile;

      switch (dir) {
        case "up":
          newTile = new Tile(firstTile.x, firstTile.y - tileWidth , tileWidth, ctx);
          tiles.unshift(newTile);
          tiles.pop();
          break;
        case "down":
          newTile = new Tile(firstTile.x, firstTile.y + tileWidth , tileWidth, ctx);
          tiles.unshift(newTile);
          tiles.pop();
          break;
        case "left":
            newTile = new Tile(firstTile.x - tileWidth, firstTile.y, tileWidth, ctx);
            tiles.unshift(newTile);
            tiles.pop();
          break;
        case "right":
            newTile = new Tile(firstTile.x + tileWidth, firstTile.y, tileWidth, ctx);
            tiles.unshift(newTile);
            tiles.pop();
          break;
      }

      if (tiles[0].equal(hostfood.tile)) {
        eat();
        hostfood.replace();
      }

      if (tiles[0].x > canvasWidth || tiles[0].x < 0 || tiles[0].y > canvasHeight || tiles[0].y < 0) {
        gameover(ctx);
      }

      if (hitself()) {
        gameover(ctx);
      }
      socket.emit("move", { gameId: gameId, newTile : { x: newTile.x, y: newTile.y, size: newTile.size }, playerName : name });
    };

    var print = function() {
      tiles.forEach(function (tile) {
        tile.print();
      });
    };

    return {
      move: move,
      print: print,
      changeDir: changeDir,
      getDir : getDir,
      tiles: tiles,
    };

  };

window.Snake = Snake;

  function Food(name, x, y, ctx) {
    var name = name;
    var getName = function(){
      return name;
    }

    var tile = new Tile(x, y, tileWidth, ctx);

    var print = function() {
      //tile.print();
      var img = document.getElementById("apple");
      ctx.drawImage(img, tile.x - 5, tile.y - 5);
    };

    var replace = function() {
      tile.x = Math.round(parseInt( (Math.random() * (canvasWidth - tileWidth) ) / 10) * 10);
      tile.y = Math.round(parseInt( (Math.random() * (canvasHeight - tileWidth) ) / 10) * 10);
    };

    return {
      print: print,
      replace: replace,
      tile: tile
    };

  };

window.Food = Food;

window.gamestart = function(speed) {
  $("#snakeCanvas").show();
  gameid = setInterval(function() {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    //context.fillStyle = "rgb(10, 90, 40)";
    context.fillStyle = $("input#snake-color").val();

    //hostsnake.move();
    hostsnake.print();
    guestsnake.print();

    hostfood.print();
    guestfood.print();

    //guestsnake.move();
    //guestsnake.print();
    //guestfood.print();

  }, speed);
}

  // /gamestart(1000);

window.gameover = function (context) {
  clearInterval(gameid);
  context.font = '50px Arial';
  context.fillStyle = 'red';

  context.fillText("Game Over :(", canvasWidth/2 - 150, canvasHeight/2 + 15);
}

  $("body").keydown(function(e) {
    if (typeof hostsnake !== "undefined") {

      var dir = keyCodeToDirectionTable[e.which];
      if (typeof dir !== 'undefined') {
        hostsnake.changeDir(dir);
      }

      if ($("input#reverse").prop("checked") && e.which === 82) {
        hostsnake.changeDir("reverse");
      }

      hostsnake.move();
    }
  });

})
