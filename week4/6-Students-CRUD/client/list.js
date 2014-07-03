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
      //item.courses = item.courses.join(", ");
      var student = {
        "fn" : item.facultyNumber,
        "name" : item.name,
        "courses" : item.courses.join(", ")
      };

      students.push(student);
    });

//console.log(students);


    var markup = template({ "students" : students });
    console.log(markup);
    $("#all-students").append(markup);

  });

  $("#all-students").on("click", "#delete", function() {
    $.ajax({
      url: "http://localhost:3030/student" + $(this).data("fn"),
      type: "DELETE",

    });
  });

});
