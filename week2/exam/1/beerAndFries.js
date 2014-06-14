"use strict";

var filterByType = function (type, data) {
  return data.filter(function (element) {
      if (typeof element === "object" && element.type === type) {
          return element;
      }
  });
};

var getSortedPointsByType = function (type, data) {
  return filterByType(type, data)
      .map(function (value) {
          return value.score;
      })
      .sort(function (a, b) {
          return a - b;
      });
};

var beerAndFries = function(data) {

  if (! data instanceof Array) {
    throw new Error("Array expected");
  }

  var beerPoints = getSortedPointsByType("beer", data);

  var friesPoints = getSortedPointsByType("fries", data);

  return beerPoints.map( function (value, index) {
          return value * friesPoints[index];
      })
      .reduce( function (a, b) {
          return parseInt(a, 10) + b;
      }, 0);
};

exports.beerAndFries = beerAndFries;
