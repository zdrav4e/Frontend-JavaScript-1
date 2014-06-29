"use strict";

$(document).ready(function() {
  var _students;

  $.getJSON('http://localhost:3000/students', function(students, textStatus) {
    _students = students;
    console.log(_students);
  });

});
