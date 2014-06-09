"use strict";

var sum_digits = function (n) {
  var remainder,
      sum = 0;
  n = Math.abs(n);
  while (n > 0) {
    remainder = parseInt(n%10, 10);
    n = parseInt(n/10, 10);
    sum += remainder;
  }
  return sum;
};

exports.sum_digits = sum_digits;
