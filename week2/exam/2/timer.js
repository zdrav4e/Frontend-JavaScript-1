"use strict";

$(document).ready(function () {

var Timer = (function () {
  var elapsed = 0;
  var timerID = 0;
  var time = 0;
  var direction;

  return {
    start: function (_time, _direction) {
      if (timerID === 0) {
        time = _time;
        direction = _direction;
        elapsed = 0;

        updateUI(getSecondsMinutes(time, elapsed, direction));

        timerID = setInterval(function () {
          elapsed += 1000;

          updateUI(getSecondsMinutes(time, elapsed, direction));

          if (elapsed >= time) {
            //find out how to use reset here
            clearInterval(timerID);
            updateButtonUI(false);
            timerID = 0;
          }
        }, 1000);
      }
    },
    reset: function () {
      updateUI({"seconds" : 0, "minutes" : 0});
      clearInterval(timerID);
      updateButtonUI(false);
      timerID = 0;
    }
  };
}());

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

  function start(dir) {
    var minutes = $("#minutes").val(),
      seconds = $("#seconds").val(),
      time_ms = 0;

    minutes = (minutes === "") ? 0 : parseInt(minutes);
    seconds = (seconds === "") ? 0 : parseInt(seconds);
    time_ms = 1000 * (minutes * 60 + seconds);

    Timer.start(time_ms, dir);
  }

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

  function updateButtonUI(disabled) {
    $("#start-down").prop("disabled", disabled);
    $("#start-up").prop("disabled", disabled);
  }

  $("#start-up").click(function () {
    start("up");
    updateButtonUI(true);
  });

  $("#start-down").click(function () {
    start("down");
    updateButtonUI(true);
  });

  $("button#stop-reset").click(function () {
    Timer.reset();
  });

});
