$(document).ready(function() {
  "use strict";

  var source = $("#name-button").html(),
      template = Handlebars.compile(source);

  var getnamesreq = $.ajax({
    url : 'http://localhost:8080/names',
    type : 'get',
    dataType : 'json'
  });

  getnamesreq.done(function(data) {
    console.log(data);
    data.forEach(function(item) {
      var html = template(item);
      $("#names").append(html);
    });
  });

  $("#names").on("click", ".name-input", function() {
    $(".name-update").prop("disabled", true);
    $(this).siblings("button.name-update").prop("disabled", false);

  });

  $("#names").on("click", ".name-update", function() {
    var input = $(this).siblings("input.name-input"),
        name = input.val(),
        nameId = input.data("nameid");

    var upnamereq = $.ajax({
      url : "http://localhost:8080/name",
      type : 'post',
      data: JSON.stringify({
        name : name,
        nameId : nameId
      }),
      contentType: "application/json",
    });

    upnamereq.done(function() {
      window.location.reload();
    });
  });

});
