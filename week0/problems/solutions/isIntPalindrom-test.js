"use strict";

var isIntPalindrom = require("./isIntPalindrom").isIntPalindrom;

exports.testPalindrom = function (test) {
  test.equal(isIntPalindrom(1), true);
  test.equal(isIntPalindrom(42), false);
  test.equal(isIntPalindrom(100001), true);
  test.equal(isIntPalindrom(999), true);
  test.equal(isIntPalindrom(123), false);
  test.done();
};
