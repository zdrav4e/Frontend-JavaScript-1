"use strict";

var sum_of_divisors = function (n) {
  var i = n, sum = 0;
  while (i>0) {
    if (parseInt(n%i, 10) === 0) {
      sum += i;
    }
    i--;
  }
  return sum;
};

exports.sum_divisors = sum_of_divisors;
