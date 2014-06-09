"use strict";

var sum_of_min_and_max = function(arr) {
  var l = arr.length -1;
  arr.sort(function (a, b) {
    return a-b;
  });
  return arr[0]+arr[l];
};

exports.sum = sum_of_min_and_max;
