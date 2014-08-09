
require.config({
  paths: {
    "jquery" : "bower_components/jquery/dist/jquery",
    "lodash" : "bower_components/lodash/dist/lodash"
  }
});

require(["jquery", "matrix", "matrixoperation"], function($, Matrix, MatrixOperations) {
  var operations = new MatrixOperations(),
      matrix, matrices = [], N, M;

  function printMatrixTable(N, M) {
    var html, i, j;

    html = '<table>';
      for (i = 0; i <= N - 1; i++) {
        html += '<tr>';
        for (j = 0; j <= M - 1; j++) {
          html += "<td><input type='number' data-row='" + i + "' data-col='" + j + "' class='matrix'></td>";
        }
        html += '</tr>';
      }
    html += '</table>';
    return html;
  }

  $('body').on('blur', '.count-rows, .count-cols', function() {
    var rows, cols, i, j, html;

    if ($(this).hasClass('count-cols')) {
      M = $(this).val();
    }
    else {
      M = $(this).siblings('.count-cols').val();
    }
    if ($(this).hasClass('.count-rows')) {
      N = $(this).val();
    }
    else {
      N = $(this).siblings('.count-rows').val();
    }
    if (N && M) {
      html = '<div>Matrix</div>' + printMatrixTable(N, M);

      $(this).parent().find('div.matrix').html(html);
      $("#first-matrix").show();
      matrix = new Matrix(N, M);
    }
  });

  $('body').on('click', '.create-matrix', function() {

    $(this).parent().find("input.matrix").each(function() {
      var val = parseInt($(this).val());
      if (typeof val === 'number') {
        matrix.setAt($(this).data('row'), $(this).data('col'), val);
      }
    });

    //if ($(this).hasClass('create-second-matrix')) {
    if (typeof matrices[0] != 'undefined') {
      matrices[1] = matrix;
      $("#matrix2")
          .html(matrix.toString())
          .parent()
          .show();
    //} else if ($(this).hasClass('create-first-matrix')) {
    } else {
      matrices[0] = matrix;
      $("#matrix1")
          .html(matrix.toString())
          .parent()
          .show();
    }

    if (matrices.length >= 2) {
      var operation = $(this).parent().data('operation');
      if (operation == 'scalarMult') {
        $('#scalar-mult-m.created').trigger('click');
      }
      if (operation == 'sum') {
        $('#sum-m.created').trigger('click');
      }
      if (operation == 'mult') {
        $('#mult-m.created').trigger('click');
      }
    }
    $("#operations").show();
  });

  $("#transpose-m").click(function() {
    var matrix = matrices[0],
        transposed = operations.transpose(matrix);

    $("#transposed")
        .html(transposed.toString())
        .parent()
        .show();
  });

  $("body").on('click', '#sum-m.not-created', function() {
    var html = printMatrixTable(N, M);

    matrix = new Matrix(N, M);

    $('#second-matrix').data('operation', 'sum').show();
    $('#second-matrix div.matrix').html(html);
    $(this)
        .removeClass('not-created')
        .addClass('created');
  });

  $("body").on('click', '#sum-m.created', function() {
    var matrix1 = matrices[0],
        matrix2 = matrices[1],
        sum = operations.add(matrix1, matrix2);

    $(this)
        .removeClass('created')
        .addClass('not-created');

    $("#sum")
        .html(sum.toString())
        .parent()
        .show();
  });

  $('body').on('click', '#scalar-mult-m.not-created', function() {
    $('#scalar').show();
    $(this)
        .removeClass('not-created')
        .addClass('created');

    $('#second-matrix')
        .data('operation', '')
        .hide();
  });

  $('body').on('click', '#scalar-mult-m.created', function() {
    var scalar = parseInt($('#scalar').val()),
        sm = operations.scalarMult(scalar, matrices[0]);

    $(this)
        .removeClass('created')
        .addClass('not-created');

    $("#scalar-mult")
        .html(sm.toString())
        .parent()
        .show();
  });

  $('body').on('click', '#mult-m.not-created', function() {
    var cols = prompt("How many columns will have the second matrix"),
        html = printMatrixTable(M, cols);

    matrix = new Matrix(M, cols);

    $('#second-matrix div.matrix').html(html);
    $('#second-matrix')
        .data('operation', 'mult')
        .show();

    $(this)
        .removeClass('not-created')
        .addClass('created');
  });

  $('body').on('click', '#mult-m.created', function() {
    var matrix1 = matrices[0],
        matrix2 = matrices[1],
        mult = operations.multiply(matrix1, matrix2);

    $(this)
        .removeClass('created')
        .addClass('not-created');

    $("#mult")
        .html(mult.toString())
        .parent()
        .show();
  });

});
