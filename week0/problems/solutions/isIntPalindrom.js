"use strict";

var isIntPalindrom = function(n) {
  var length = n.toString().length - 1;

  while(length > 0) {

    if (Math.floor(n / Math.pow(10, length)) !== n%10) {
      return false;
    }

    n = n % Math.pow(10, length);
    n = Math.floor(n / 10);

    length = length - 2 ;
  }
  return true;
};

exports.isIntPalindrom = isIntPalindrom;
