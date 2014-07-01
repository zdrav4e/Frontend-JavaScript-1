"use strict";

$(document).ready(function () {

  $("div").slice(1).hide();

  $(".tabs li").on("click", "a", function() {

    var id = $(this).attr("href");

    $(".tabs li").children("a").removeClass("active");
    $(this).addClass("active");

    $("div").hide();
    $("div" + id).toggle();

    return false;
  });
});
