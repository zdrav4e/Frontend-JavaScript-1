require.config({
  paths: {
    "Q": "bower_components/q/q"
  }
});

require(["Q"], function(Q) {

  function first() {
    var defer = Q.defer();
    setTimeout(function() {
      console.log('first');
      defer.resolve();
    },
    4000);
    return defer.promise;
  }

  function second() {
    var defer = Q.defer();
    setTimeout(function() {
      console.log('second');
      defer.resolve();
    },
    1000);
    return defer.promise;
  }

  function third() {
    console.log("I should do the job after first and second");
  }
/*
  first(function() {
    console.log("called first!");
    second(function() {
      console.log("called second!");
      third();
    });
  });
*/

Q.fcall(first)
 .then(second)
 .then(third)
 .catch(function(error) {
    console.log(error);
 })
 .done();

});
