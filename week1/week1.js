"use strict";

var sum = function (a, b) {
  if ((typeof a === typeof b) && (typeof a === "string" || typeof a === "number")) {
    return a + b;
  }
  throw new TypeError("Something is wrong with the types!");
};

exports.sumByType = sum;

var any = function(pred, arr) {
  var res = arr.filter( function (x) {
      return pred(x);
    }).length;

  return res > 0;
};

var contains = function(element, arr) {
  return any(function(item) {
    return item === element;
  }, arr);
};

exports.contains = contains;

var containsAll = function(elements, arr) {
  var not_contained = elements.filter(function(item) {
    return !contains(item, arr);
  });
  return not_contained.length === 0;
};

exports.containsAll = containsAll;

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

var groupBy = function(groupingFunction, arr) {
  var grouped = {};
    arr.forEach(function(item) {
      grouped[groupingFunction(item)] = grouped[groupingFunction(item)] || [];
      grouped[groupingFunction(item)].push(item);
    });
  return grouped;
};

var groupedStudents = groupBy(function (item) {
  return item.course;
}, students);

//console.log(groupedStudents);

var countBy = function(countingFunction, arr) {
   var count_grouped = {};
    arr.forEach(function(item) {
      count_grouped[countingFunction(item)] = count_grouped[countingFunction(item)] || 0;
      count_grouped[countingFunction(item)]++;
    });
  return count_grouped;
};

var countedStudents = countBy(function (item) {
  return item.course;
}, students);

//console.log(countedStudents);

var always = function(value) {
  return function(){
    return value;
  };
};

var f = always(5);
//console.log(f());

var only = function(type, arr) {
  var result = arr.filter(function(item) {
    return (typeof item === type);
  });
  return result.length === arr.length;
};

exports.only = only;

var range = function(from, to) {
  if (from < to) {
    return [].concat([from], range(from + 1, to));
  }
  return [to];
};

exports.range = range;

var find = function(predicate, arr) {
  return arr.filter(predicate)[0];
};

exports.find = find;

var without = function(exclude, arr) {
  return arr.filter( function (item) {
    return !contains(item, exclude);
  });
};

exports.without = without;

var equalArrays = function (arr1, arr2) {
  return containsAll(arr1, arr2) && arr1.length === arr2.length;
};

exports.equalArrays = equalArrays;

var pluck = function(property, arr) {
  return arr.map( function (item) {
    return item[property];
  });
};

exports.pluck = pluck;

var zip = function() {
  var zip_arguments = arguments;

  return arguments[0].map( function (item, index) {
    var temp = [], arr;

    for (arr in zip_arguments) {
      temp.push(zip_arguments[arr][index]);
    }
    return temp;
  });
};

//console.log(zip([1, 2, 3], [4, 5, 6], [7, 8, 9]));

var wordsHistogram  = function (str) {
  var histogram = {};
  str.replace(/[^a-zA-Z0-9 ]/g, '')
    .toLowerCase()
    .split(" ")
    .forEach( function (item) {
      histogram[item] = histogram[item] || 0;
      histogram[item]++;
    });
    return histogram;
};

var str = "A function is a function with a very functional function!"
//console.log ( wordsHistogram(str) );

var charsHistogram = function (str) {
  var histogram = {};
  str.replace(/[^a-zA-Z0-9]/g, '')
    .toLowerCase()
    .split("")
    .forEach( function (item) {
      histogram[item] = histogram[item] || 0;
      histogram[item]++;
    });

  return histogram;
};

var str = "Count the characters in this very profound sentence";
//console.log(charsHistogram(str));

var ul = function(items) {
  var inner = pluck("label", items).join("</li><li>");
  return ["<ul><li>", inner, "</li></ul>"].join("");
};

var ol = function(items) {
  var inner = pluck("label", items).join("</li><li>");
  return ["<ol><li>", inner, "</li></ol>"].join("");
};

var items = [{ "label" : "Item 1"}, { "label" : "Item 2"}]
var htmlOl = ol(items);
var htmlUl = ul(items);

//console.log(htmlOl, htmlUl);

var nested = function (items, listtype) {
  var result = "<" + listtype + ">";

  items.forEach ( function (item) {
    result += "<li>" + item["label"];

    if (item.children) {
      result += ulNested(item.children);
    }

    result += "</li>";
  });

  result += "</" + listtype +">";
  return result;
};

var ulNested = function (items) {
  return nested(items, "ul");
};

var olNested = function (items) {
  return nested(items, "ol");
};

var itemsNested = [{ "label" : "Item 1"},
             { "label" : "Item 2", "children" : [
                {
                    "label" : "Level 2 of Item 2"
                },
                {
                    "label" : "Another level 2"
                }
             ]}];

console.log(olNested(itemsNested));
console.log(olNested(items));
