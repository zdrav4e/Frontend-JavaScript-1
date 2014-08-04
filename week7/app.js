
require.config({
  paths: {
    "jquery" : "bower_components/jquery/dist/jquery",
    "lodash" : "bower_components/lodash/dist/lodash"
  }
});

require(["jquery", "matrix", "matrixoperation", "calculator_ui"], function($, Matrix, MatrixOperations, CalculatorUi) {
  var mo = new MatrixOperations();

  var m = mo.createFromArray([[1, 2, 3], [4, 5, 6]]);

      //console.log(m.getN());
      //console.log(m.getM());
      //console.log(m.getRow(0));
      /*console.log(m.getCol(0));

      console.log(m.getAt(0, 1));
      m.setAt(1, 1, -5);
      console.log(m.getData());
      m.setRow(0, [-1, -2, -3]);
      console.log(m.toString());
      m.setCol(0, [1, -4]);*/
      console.log(m.toString());

      var mt = mo.transpose(m);
      console.log(mt.toString());

      //var m2 = mo.createFromArray([[4, 5, 6], [1, 2, 3]]);

      //var sum = mo.add(m, m2);

      //console.log(sum.toString());

      //var sm = mo.scalarMult(-1, m2);
      //console.log(sm.toString());
      //console.log(mt.getCol(0));

      var mult = mo.multiply(m, mt);
      console.log(mult.toString());
      Handlebars.registerHelper('fullName', function(person) {
  return person.firstName + " " + person.lastName;
});
});
