
"use strict";

 $(document).ready(function() {

  var dd = $(".accordion").children("dd");
  dd.slice(1).hide();

  $(".accordion").on("click", "dt", function() {
    dd.hide();
    $(this).next("dd").toggle();
    return false;
  });
 });
