"use strict";

var is_prime = function is_prime(n) {
  var i;
  if (n ===1) {
    return false;
  }
  if (n ===2) {
    return true;
  }
  if (n%2 === 0) {
    return false;
  }
  for (i = 3; i < Math.floor(Math.sqrt(n)); i+=2) {
    if (n%i === 0) {
      return false;
    }
  }
  return true;
};

exports.is_prime = is_prime;
