"use strict";

var format = function(str, dict) {
  var placeholder;
  for (placeholder in dict) {
    var plstr = "{" + placeholder + "}";

    while (str.indexOf(plstr) !== -1) {
      str = str.replace(plstr, dict[placeholder]);
    }
  }
  return str;
};

var formatted = format("{lang} is a very weird {thing}! {lang}!", {
  "lang" : "JavaScript",
  "thing" : "language"
});

console.log(formatted);

