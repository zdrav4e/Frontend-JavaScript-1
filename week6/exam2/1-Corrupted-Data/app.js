"use strict";
var data = require("./data"),
    _ = require("lodash");

function groupCorrupted (data) {
  var grouped = _.groupBy(data, function(visit) {
    //if (typeof visit === "object" && typeof visit.fields === "object") {
      var fields = visit.fields;
      var date = fields.date;
      var student = fields.student;
      return date + ' + ' + student;
    //}
  });
  return grouped;
}

function getDuplicates(grouped) {
  var result = [],
      index;
  for (index in grouped) {
    if (grouped[index].length > 1) {
      result.push(grouped[index][0]);
    }
  }
  return result;
}

function print(data) {
  data.forEach(function(item) {
    console.log(item);
  });
}

var grouped = groupCorrupted(data);
print(getDuplicates(grouped));
