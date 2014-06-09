"use strict";

var isNumberBalanced = require("./isNumberBalanced").isNumberBalanced;

exports.isbalanced = function(test) {
  test.equals(isNumberBalanced(9), true);
  test.equals(isNumberBalanced(11), true);
  test.equals(isNumberBalanced(13), false);
  test.equals(isNumberBalanced(121), true);
  test.equals(isNumberBalanced(4518), true);
  test.equals(isNumberBalanced(28471), false);
  test.equals(isNumberBalanced(1238033), true);
	test.done();
};
