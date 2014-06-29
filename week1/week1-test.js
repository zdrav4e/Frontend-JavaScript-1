"use strict";

var sum = require("./week1").sumByType;

exports.testSum = function(test) {
  test.throws(function() {
    sum("this", 3);
  });

  test.throws(function () {
    sum("5", 3);
  });
  test.equals(sum(5, 3), 8);
  test.equals(sum("this ", "is interesting"), "this is interesting");

  test.done();
};

var contains = require("./week1").contains;

var equalArrays = require("./week1").equalArrays;

exports.testContains = function(test) {
  test.equals(contains(2, [1, 2, 3]), true);
  test.equals(contains(2, [1, "2", 3]), false);
  test.done();
};

var containsAll = require("./week1").containsAll;

exports.testContainsAll = function (test) {
  test.equals(containsAll([1, 2, "3"], [1, 2, 3, 4, 5]), false);
  test.equals(containsAll([1, 2, 3], [1, 2, 3, 4, 5]), true);
  test.equals(containsAll(["this", 2, 3], [2, "this", 3, 4, 5]), true);
  test.done();
};

var only = require("./week1").only;

exports.testOnly =  function (test) {
  test.equals(only("string", [1,2,3,4]), false);
  test.equals(only("number", [1,2,3,4]), true);
  test.equals(only("string", [1,2,3,"4"]), false);
  test.equals(only("number", [1,2,3,"4"]), false);
  test.done();
};

var range = require("./week1").range;

exports.testRange = function (test) {
  test.equals(equalArrays(range(1, 10), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]), true);
  test.equals(equalArrays(range(1, 10), [1, 2, 3, 4, 5, 6, 7, 8, 9]), false);
  test.done();
};

var find = require("./week1").find;

var even = function (item) {
    return parseInt(item % 2, 10) === 0;
};

exports.testFind = function (test) {
  test.equals(find(even, [1, "test", 2, 3, 4, 5, 6]), 2);
  test.equals(find(even, [1, "test", "2", 3, 4, 5, 6]), 2);
  test.equals(find(even, [1, "test", "21", 3, 4, 5, 6]), 4);
  test.equals(find(even, [1, "test", "21", 3, 5, 7]), undefined);
  test.done();
};

var without = require("./week1").without;

exports.testWithout = function (test) {
  test.equals(equalArrays(without([5, 6], [5, 1, 2, 6, 3, 4]), [1, 2, 3, 4]), true);
  test.done();
};


var students = [{
  "name" : "Daniel Taskoff",
  "course" : "Frontend JavaScript"
}, {
  "name" : "Elena Jeleva",
  "course" : "Programming 101"
}, {
  "name" : "Luboslava Dimitrova",
  "course" : "Frontend JavaScript"
}, {
  "name" : "Anton Antonov",
  "course" : "Core Java"
}, {
  "name" : "Nikola Dichev",
  "course" : "Core Java"
}];

var pluck = require("./week1").pluck;

exports.testPluck = function (test) {

  test.equals( equalArrays( pluck("name", students),
    ["Daniel Taskoff", "Elena Jeleva", "Luboslava Dimitrova", "Anton Antonov", "Nikola Dichev"]), true);

  test.done();
};
