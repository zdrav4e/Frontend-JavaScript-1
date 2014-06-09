"use strict";

var isNumberBalanced = function(n) {
  var count = Math.floor(n.toString().length / 2),
      sumleft = 0,
      sumright = 0,
      left = Math.floor(n / Math.pow(10, count)),
      right = n % Math.pow(10, count);

  if (count === 0) {
    return true;
  }

  if (left.toString().length > right.toString().length) {
    left = Math.floor(left / 10);
  }

  sumleft = left.toString()
                  .split("")
                  .map( function (a) {
                      return parseInt(a, 10); })
                  .reduce( function (a, b) {
                      return parseInt(a, 10) + b; });
  sumright = right.toString()
                    .split("")
                    .map( function (a) {
                        return parseInt(a, 10); })
                    .reduce( function(a, b) {
                        return parseInt(a + b, 10); });

  return sumleft === sumright;
};

exports.isNumberBalanced = isNumberBalanced;
