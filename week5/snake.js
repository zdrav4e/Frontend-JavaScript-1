$(document).ready(function(){
  "use strict";


var canvas = document.getElementById("snakeCanvas"),
      context = canvas.getContext("2d"),
      canvasWidth = canvas.width,
      canvasHeight = canvas.height,
      tileWidth = 10,
      keyCodeToDirectionTable = {
        37: "left",
        38: "up",
        39: "right",
        40: "down"
      },
      directionsArray = ["left", "up", "right", "down"],
      reverse = {"up" : "down", "down" : "up", "left" : "right", "right" : "left"},
      gameid;

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

  var snake = (function(ctx) {

    var dir = "down", prevDir = "down";

    var tiles = [
      new Tile(100, 30, tileWidth, ctx),
      new Tile(100, 20, tileWidth, ctx),
      new Tile(100, 10, tileWidth, ctx)
    ];

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
      if (d === "reverse") {
        var temp = dir;
        dir = reverse[dir];
        prevDir = temp;

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

      if (tiles[0].equal(food.tile)) {
        eat();
        food.replace();
      }

      if (tiles[0].x > canvasWidth || tiles[0].x < 0 || tiles[0].y > canvasHeight || tiles[0].y < 0) {
        gameover(ctx);
      }

      if (hitself()) {
        gameover(ctx);
      }

    };

    var print = function() {
      tiles.forEach(function (tile) {
        tile.print();
      });
    };

    var countTiles = function () {
      return tiles.length;
    }

    return {
      move: move,
      print: print,
      changeDir: changeDir,
      getDir : getDir,
      countTiles : countTiles
    };

  } (context));


  var food = (function(ctx) {

    var tile = new Tile(10, 80, tileWidth, ctx);

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

  } (context));

function gamestart(speed) {

  gameid = setInterval(function() {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    //context.fillStyle = "rgb(10, 90, 40)";
    context.fillStyle = $("input#snake-color").val();
    snake.move();
    snake.print();
    //context.fillStyle = "red";
    food.print();
  }, speed);
}

  gamestart(100);

function gameover(context) {
  var players = [];
  clearInterval(gameid);
  context.font = '50px Arial';
  context.fillStyle = 'red';

  context.fillText("Game Over :(", canvasWidth/2 - 150, canvasHeight/2 + 15);
  var name = prompt("Enter your name");
  if (name !== null) {
    localStorage['player_' + name] = snake.countTiles();
  }
}

  $("body").keydown(function(e) {
    var dir = keyCodeToDirectionTable[e.which];
    if (typeof dir !== 'undefined') {
      snake.changeDir(dir);
      e.preventDefault();
    }
    if ($("input#pause").prop("checked") && e.which === 80) {
      snake.changeDir("stop");
      e.preventDefault();
    }
    if ($("input#reverse").prop("checked") && e.which === 82) {
      snake.changeDir("reverse");
      e.preventDefault();
    }
    if (e.which === 65) {
      $("input#speed").val( parseInt($("input#speed").val()) - 10 );
      $("input#speed").trigger("change");
    }
    if (e.which === 83) {
      $("input#speed").val( parseInt($("input#speed").val()) + 10 );
      console.log(parseInt($("input#speed").val()) + 10);
      $("input#speed").trigger("change");
    }
  });

  $("input#speed").change(function() {
    var speed = 200 - this.value;
    clearInterval(gameid);
    gamestart(speed);
  });

  $("button#top-ten").click(function() {
    var source = $("#top-ten-template").html(),
        template = Handlebars.compile(source),
        players = getTopTen(),
        html;

    if (players.length > 0) {
      html = template({ players : players });
      $("#top-ten-list").html(html);
    }

  });

function getTopTen() {
  var players = [], i, key;
  for (i = 0; i < localStorage.length; i++) {
    key = localStorage.key(i);
    if (key.indexOf("player_") === 0) {
        players.push({ name : key.slice(7), score : localStorage.getItem(key) });
    }
  }
  players.sort(function(a, b) {
    return b.score - a.score;
  });

  if (players.length > 10) {
    players = players.slice(0, 10);
    for (i = 0; i < localStorage.length; i++) {
      key = localStorage.key(i);
      if (key.indexOf("player_") === 0 && _.findIndex(players, { 'name': key.slice(7) }) === -1) {
        localStorage.removeItem(key);
      }
    }
  }
  return players;
}

})
