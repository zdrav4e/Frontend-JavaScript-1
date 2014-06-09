"use strict";

var is_prime = require("./isPrime").is_prime;

var prime_num_divs = function(n) {
  var count_divisors = function (n) {
    var i = n, count = 0;
    while (i>0) {
      if (parseInt(n%i, 10) === 0) {
        count += 1;
      }
      i--;
    }
    return count;
  };

  return is_prime(count_divisors(n));
};

exports.pnd = prime_num_divs;
