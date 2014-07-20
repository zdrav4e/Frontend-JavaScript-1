$(document).ready(function() {
	"use strict";

  var canvas = document.getElementById("triangles"),
      context = canvas.getContext("2d"),
      canvasWidth = canvas.width,
      canvasHeight = canvas.height;


  var source = $("#saved-states-select").html(),
      template = Handlebars.compile(source);

function Dot(x, y) {
  this.x = x;
  this.y = y;
}

function Triangle(ctx) {
  var dots = [];

  this.addDot = function (dot) {
    if (dots.length  < 3) {
      dots.push(dot);
    }
  };

  this.drawTriangle = function() {
    var first = dots[0];

    ctx.fillStyle = $("input#color").val();
    ctx.beginPath();
    ctx.moveTo(first.x, first.y);

    dots.slice(1).forEach(function (item, index) {
      ctx.lineTo(item.x, item.y);
    });

    ctx.closePath();
    ctx.fill();
  };

  this.isFinished = function () {
    return dots.length === 3;
  };
}

var game = (function(ctx) {
  var triangles = [];

  var act = function(dot) {

    var lastTriangle = triangles.slice(-1)[0];
      if ((typeof lastTriangle !== "undefined" && lastTriangle.isFinished()) || typeof(lastTriangle) === "undefined") {
        var newTriangle = new Triangle(ctx);
        newTriangle.addDot(dot);
        triangles.push(newTriangle);
      }
      else if (typeof lastTriangle !== "undefined") {
        lastTriangle.addDot(dot);
        if (lastTriangle.isFinished()) {
          lastTriangle.drawTriangle();
        }
      }
    }

  return {
    act : act
  };

}(context));

  $("canvas#triangles").click(function(e) {
    var offset = $(this).offset();
    var dot = new Dot(e.clientX - offset.left, e.clientY - offset.top);

    game.act(dot);
  });

  $("button#clear-canvas").click(function() {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
  });

  $("#settings").on('click' , 'button#load-state', function() {
    var triangles = JSON.parse(localStorage.getItem('triangles')),
        img = new Image(),
        state;

    triangles = triangles || {};
    state = triangles[$("select#saved-states").val()]

    img.onload = function(){
      context.drawImage(img,0,0);
    }
    img.src = state;
  });

  $("button#save-state").click(function() {
    var name = prompt("Please enter a name for saved state"),
        state = canvas.toDataURL(),
        triangles = JSON.parse(localStorage.getItem("triangles"));

    triangles = triangles || {};
    triangles[name] = state;

    localStorage.setItem("triangles", JSON.stringify(triangles));
  });

  (function init() {
    var triangles = JSON.parse(localStorage.getItem('triangles')),
        states = [];

      triangles = triangles || {};
      for (var index in triangles) {
        states.push({ name : index, value : triangles[index]});
      }

      if (states.length > 0) {
        var html = template({states : states});
        $("#settings").prepend(html);
      }
  }());

});
