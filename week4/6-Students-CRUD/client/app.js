
$(document).ready(function() {

  "use strict";

  var source = $("#list-all-students").html();
  var template = Handlebars.compile(source);
  var students = [];

  var ax = $.ajax({
    url : "http://localhost:3030/students",
    type : "GET",
    dataType: 'json',
  });

  ax.done(function(data) {

    data.forEach(function(item) {
      var student = {
        "fn" : item.facultyNumber,
        "name" : item.name,
        "courses" : item.courses.join(", ")
      };

      students.push(student);
    });

    var markup = template({ "students" : students });
    console.log(markup);
    $("#all-students").append(markup);
  });

    $("#all-students").on("click", ".update", function() {
      $(this).removeClass("update");
      $(this).addClass("save");
      $(this).html("Save");
      var siblings = $(this).siblings();
      siblings.prop("disabled", false);
      siblings.filter("input[name='name']").focus();
    });

    $("#all-students").on("click", ".save", function() {
      var $savebutton = $(this);
      var siblings = $(this).siblings();

      var courses = siblings
        .filter("input[name='courses']")
        .val()
        .split(",")
        .map(function(item){
          return $.trim(item);
        });

      var student = {
        name: siblings.filter("input[name='name']").val(),
        facultyNumber: siblings.filter(".fn").html(),
        courses: courses
      };

      $.ajax({
        type : "POST",
        url: "http://localhost:3030/student",
        data: JSON.stringify(student),
        contentType: "application/json",
      });

      siblings.filter("input").prop("disabled", true);
      $(this).html("Update");
      $(this).removeClass("save");
      $(this).addClass("update");
    });

  $("#all-students").on("click", ".delete", function() {
    $(this).parent().remove();
    $.ajax({
      url: "http://localhost:3030/student/" + $(this).data("fn"),
      type: "DELETE"
    });
  });

$("#add-student").click(function() {
  var siblings = $(this).siblings().filter("input");

  siblings.filter("input[name='fn']").val();
  var courses = siblings
    .filter("input[name='courses']")
    .val()
    .split(",")
    .map(function(item){
      return $.trim(item);
    });

  var student = {
    name : siblings.filter("input[name='name']").val(),
    facultyNumber : siblings.filter("input[name='fn']").val(),
    courses : courses
  };

  $.ajax({
    type : "POST",
    url: "http://localhost:3030/student",
    data: JSON.stringify(student),
    contentType: "application/json"
  })
  .done(function () {
    location.reload();
  });
});

});
