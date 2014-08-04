var Matrix = require();

define(["lodash", "matrix"], function(_, Matrix) {

  function MatrixOperations() {

    this.createFromArray = function(data) {

      var m = new Matrix(data.length, data[0].length);
      for (var i = data.length - 1; i >= 0; i--) {
        for (var j = data[0].length -1; j >= 0; j--) {
          m.setAt(i, j, data[i][j]);
        }
      }

      return m;
    };

    this.transpose = function(M) {
      var m = new Matrix(M.getM(), M.getN());

      _.range(M.getN()).forEach(function(index) {
        m.setCol(index, M.getRow(index));
      });

      return m;
    };

    this.add = function(M1, M2) {
      if (M1.getN() !== M2.getN() || M1.getM() !== M2.getM())  {
        return ;
      }

      var i, j, m = new Matrix(M1.getN(), M1.getM());

      for (i = m.getN() - 1; i >= 0; i--) {
        for (j = m.getM() - 1; j>= 0; j--) {
          m.setAt(i, j, M1.getAt(i, j) + M2.getAt(i, j));
        }
      }

      return m;
    };

    this.scalarMult = function (scalar, M1) {
      if (typeof scalar !== "number") {
        return ;
      }
      var m = new Matrix(M1.getN(), M1.getM());
      for (var i = m.getN() - 1; i >= 0; i--) {
        for(var j = m.getM() - 1; j >= 0; j--) {
          m.setAt(i, j, M1.getAt(i, j) * scalar);
        }
      }
      return m;
    };

    var multiplyrows = function(row1, row2) {
      var res = 0;
      for (var i = row1.length - 1; i >= 0; i--) {
        res += row1[i] * row2[i];
      }
      return res;
    }

    this.multiply = function(M1, M2) {
      if (M1.getM() !== M2.getN()) {
        return ;
      }
      var m = new Matrix(M1.getN(), M2.getM());
      if (M1.getM() !== M2.getN()) {
        return ;
      }
      for (var i = m.getN() -1; i >= 0; i--) {
        for (var j = m.getM() - 1; j >= 0; j--) {
          m.setAt(i, j, multiplyrows(M1.getRow(i), M2.getCol(j)));
        }
      }
      return m;
    }
  }

  return MatrixOperations;
});
