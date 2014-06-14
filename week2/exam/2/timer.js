"use strict";

$(document).ready(function () {

//Get seconds and minutes from miliseconds
function getSecondsMinutes(time, elapsed, direction) {
  var seconds, minutes;
  if (direction === "down") {
    seconds = (time - elapsed) / 1000;
  } else {
    seconds = elapsed / 1000;
  }
  minutes = parseInt(seconds / 60, 10);
  seconds = parseInt(seconds % 60, 10);

  return {"seconds" : seconds, "minutes" : minutes};
}

function Timer(time, direction) {
  //var start = new Date().getTime();
  var that = this;
  var elapsed = 0;

  this.timerID = setInterval(function () {
    //Pretend there is no delay - elapsed = new Date().getTime() - start
    elapsed += 1000;

    var seconds_minutes = getSecondsMinutes(time, elapsed, direction);
    updateUI(seconds_minutes);

    if (elapsed >= time) {
      clearInterval(that.timerID);
    }

  }, 1000);

  //Public interface
  this.reset = function() {
    updateUI({"seconds" : 0, "minutes" : 0});
    clearInterval(this.timerID);
  };
}

  var timer;

  $("#start-up").click(function () {
    var minutes = $("#minutes").val(),
        seconds = $("#seconds").val(),
        time_ms = 1000 * (minutes * 60 + seconds);

    timer = new Timer(time_ms, "up");
  });

  $("#start-down").click(function () {
    var minutes = $("#minutes").val(),
        seconds = $("#seconds").val(),
        time_ms = 1000 * (minutes * 60 + seconds);

    updateUI({"seconds" : seconds, "minutes" : minutes});
    timer = new Timer(time_ms, "down");
  });

  $("button#stop-reset").click(function () {
    timer.reset();
  });

  function updateUI(seconds_minutes) {
    var minute_first_digit = parseInt(seconds_minutes.minutes / 10, 10),
        minute_second_digit = parseInt(seconds_minutes.minutes % 10, 10),
        second_first_digit = parseInt(seconds_minutes.seconds / 10, 10),
        second_second_digit = parseInt(seconds_minutes.seconds % 10, 10);

    $("#minute-first-digit").html(minute_first_digit);
    $("#minute-second-digit").html(minute_second_digit);
    $("#second-first-digit").html(second_first_digit);
    $("#second-second-digit").html(second_second_digit);
  }

} (jQuery) );
