"use strict";

define(function() {

  function Matrix(N, M) {
    var N = N, M = M;
    var matrix = [];

    for (var i = 0; i < N; i++) {
      matrix[i] = [];
      for (var j = 0; j < M; j++) {
        matrix[i][j] = 1;
      }
    }

    var getN = function(){
      return N;
    };

    var getM = function(){
      return M;
    };

    var getRow = function(index) {
      return matrix[index].slice(0);
    };

    var getCol = function(index) {
      var col = [];
      matrix.forEach(function(item, i) {
        col.push(item[index]);
      });
      return col;
    };

    var setRow = function(index, row) {
      if (index === N + 1) {
        matrix[index] = row;
        N = N + 1;
      }
      else if (0 <= index && index <= N ) {
        matrix[index] = row;
      }
    };

    var setCol = function(index, col) {
      if (index === M + 1) {
        M = M + 1;
        matrix.forEach(function(item, i) {
          matrix[i][index] = col[i];
        });
      }
      else if (0 <= index && index <= M) {
        matrix.forEach(function(item, i) {
          matrix[i][index] = col[i];
        });
      }
    };

    var getAt = function(i, j) {
      return matrix[i][j];
    };

    var setAt = function(i, j, value) {
      //console.log(i, j);
      if (typeof matrix[i][j] !== "undefined") {
        matrix[i][j] = value;
      }
    };

    var getData = function() {
      return matrix.slice(0);
    };

    var toString = function() {
      var string = "";
      matrix.forEach(function(item, index) {
        string += item.join("  ");
        string += '<br>';
      });
      return string;
    };

    return {
      getN : getN,
      getM : getM,
      getRow : getRow,
      getCol : getCol,
      setRow : setRow,
      setCol : setCol,
      getAt : getAt,
      setAt : setAt,
      getData : getData,
      toString : toString
    }
  }

  return Matrix;

});
