"use strict";

var forEach = function(f, arr) {
  var
    i = 0;
  if (Array.isArray(arr)) {
    var n = arr.length;

    for(i; i < n; i++) {
      f(arr[i], i, arr);
    }
  }
  else if (typeof arr === "object") {
    for(i in arr) {
      f(arr[i], i, arr);
    }
  }
};

exports.forEach = forEach;

var infoObj = {
    "name" : "Zdrav4e",
    "age" : 25,
};

var infoArr = [25, "Zdrav4e"];

forEach(function(value, key) {
   console.log(key, "-", value);
}, infoObj);

forEach(function(value) {
   console.log(value);
}, infoArr);
