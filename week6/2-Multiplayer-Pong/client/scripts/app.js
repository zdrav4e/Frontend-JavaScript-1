"use strict";

require.config({
  paths: {
    "jquery" : "../bower_components/jquery/dist/jquery",
    "lodash" : "../bower_components/lodash/dist/lodash"
  }
});

//define("canvas", function() {
  var canvas = document.getElementById("pong");
  //return canvas;
//});

//define("context", function() {
  var context = canvas.getContext("2d");
  //return context;
//});

define("gameover", function() {
  var gameover = function(winnerpad) {
    clearInterval(gameId);
    context.font = '50px Arial';
    context.fillStyle = 'red';

    context.fillText(winnerpad.name + " wins!", canvas.width/2 - 150, canvas.height/2 + 15);
  };
  return gameover;
});

require(["jquery", "pong", "pad", "wall", "canvas"], function($, Pong, Pad, Wall) {
  //canvas.width = 600; canvas.height = 400;

  var keyCodeToDirectionTable = {
    38: "up",
    40: "down"
  };

  function initGame() {
    window.playerPad = new Pad(570, 100, 'playerPad');
    window.pcPad = new Pad(10, 100, 'pcPad');
    window.pong = new Pong(10, 10);

    window.topwall = new Wall(0, canvas.width, 0, 1), //{'leftX' : 0, 'rightX' : canvas.width, 'topY' : 0, 'bottomY' : 1},
    window.bottomwall = new Wall(0, canvas.width, canvas.height - 1, canvas.height),//{'leftX' : 0, 'rightX' : canvas.width, 'topY' : canvas.height - 1, 'bottomY' : canvas.height};
    window.rightwall = new Wall(canvas.width - 1, canvas.width, 0, canvas.height), //{'leftX' : canvas.width - 1, 'rightX' : canvas.width, 'topY' : 0, 'bottomY' : canvas.height},
    window.leftwall = new Wall(0, 1, 0, canvas.height);//{'leftX' : 0, 'rightX' : 1, 'topY' : 0, 'bottomY' : canvas.height};
    window.gamepoints = 3;

    var dir = "down";
    var reverse = {"up" : "down", "down" : "up"};
    var x = 10, y = 10;

    window.gameId = setInterval(function() {

      context.clearRect(0, 0, canvas.width, canvas.height);
      playerPad.print(context);
      pcPad.print(context);
      pong.move();
      pong.print(context);
    }, 40);
  }

  initGame();

  $("body").keydown(function (event) {
    var dir = keyCodeToDirectionTable[event.which];
    if (dir !== undefined) {
      playerPad.move(dir);
      event.preventDefault();
    }
  });

});
