"use strict";

require.config({
  paths: {
    "handlebars" : "bower_components/handlebars/handlebars",
  },
  shim: {
    "handlebars": {
      exports: "Handlebars"
    }
  }
});

define(["matrix", "matrixoperation", "handlebars"], function(Matrix, MatrixOperations, Handlebars) {
  var operations = new MatrixOperations(),
      matrix, matrices = [], N, M;
/*
  $('body').on('click', '.input-matrix', function() {
    var i, j, cel = {}, cols = [], rows = [];
    N = parseInt($(this).siblings("input.count-rows").val());
    M = parseInt($(this).siblings("input.count-cols").val());

    var html = '<table>';
    for (i = 0; i <= N - 1; i++) {
      html += '<tr>';
      for (j = 0; j <= M - 1; j++) {
        html += "<td><input type='number' data-row='" + i + "' data-col='" + j + "' class='matrix'></td>";
      }
      html += '</tr>';
    }
    html += '</table>';

    $(this).parent().find('div.matrix').html(html);
    matrix = new Matrix(N, M);
  });*/

$('body').on('blur', '.count-rows, .count-cols', function() {
  var rows, cols, i, j;
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
    console.log(N, M);

    var html = '<div>Matrix</div><table>';
    for (i = 0; i <= N - 1; i++) {
      html += '<tr>';
      for (j = 0; j <= M - 1; j++) {
        html += "<td><input type='number' data-row='" + i + "' data-col='" + j + "' class='matrix'></td>";
      }
      html += '</tr>';
    }
    html += '</table>';

    $(this).parent().find('div.matrix').html(html);
    matrix = new Matrix(N, M);

  }
});

  $('body').on('click', '.create-matrix', function() {
    var array = [];
    //var matrix = $(this).parent().hasClass('second-matrix');
    $(this).parent().find("input.matrix").each(function() {
      //if (second_matrix) {
        //console.log('ere', second_matrix);
        var val = parseInt($(this).val());
        if (typeof val === 'number') {
          matrix.setAt($(this).data('row'), $(this).data('col'), parseInt($(this).val()));
        }

      //}
      //else {
        //console.log('here');
        //matrix.setAt($(this).data('row'), $(this).data('col'), parseInt($(this).val()));
      //}
    });
    //matrices.push(matrix);
    if (typeof matrices[0] !== 'undefined') {
      matrices[1] = matrix; }
    else {
      matrices[0] = matrix;
    }
    if (matrices.length >= 2) {
      var operation = $(this).parent().data('operation');
      console.log(operation);
      if (operation == 'scalarMult') {
        $('#scalar-mult-m.created').trigger('click');
      }
      if (operation == 'sum') {
        console.log('sum');
        $('#sum-m.created').trigger('click');
      }
      if (operation == 'mult') {
        console.log('mult');
        $('#mult-m.created').trigger('click');
      }
    }

    $("#operations").show();
    $(".create-matrix").show();
  });

  $("#transpose-m").click(function() {
    var matrix = matrices[0];
    var transposed = operations.transpose(matrix);
    $("#transposed").html(transposed.toString());
  });

  $("body").on('click', '#sum-m.not-created', function() {
    var sum = '', html = '', i, j;
    matrix = new Matrix(N, M);

    var html = '<table>';
    for (i = 0; i <= N - 1; i++) {
      html += '<tr>';
      for (j = 0; j <= M - 1; j++) {
        html += "<td><input type='number' data-row='" + i + "' data-col='" + j + "' class='matrix'></td>";
      }
      html += '</tr>';
    }
    html += '</table>';

    $('#second-matrix').show();
    $('#second-matrix div.matrix').html(html);
    //$('#second-matrix').attr('data-operation', 'sum');
    $('#second-matrix').data('operation', 'sum');

    $('#second-matrix .count-rows, #second-matrix .count-cols, #second-matrix .input-matrix').hide();
    $(this).removeClass('not-created');
    $(this).addClass('created');
  });

 $("body").on('click', '#sum-m.created', function() {
  console.log('here');
  var matrix1 = matrices[0];
  var matrix2 = matrices[1];
  var sum = operations.add(matrix1, matrix2);
  $(this).removeClass('created');
  $(this).addClass('not-created');
  console.log(sum.toString());
 });

 $('body').on('click', '#scalar-mult-m.not-created', function() {
  $('#scalar').show();
  $('#second-matrix').hide();
  $(this).removeClass('not-created');
  $(this).addClass('created');
  $('#second-matrix').data('operation', '');
 });

$('body').on('click', '#scalar-mult-m.created', function() {
  var scalar = parseInt($('#scalar').val());
  var sm = operations.scalarMult(scalar, matrices[0]);
  console.log(sm.toString());
  $(this).removeClass('created');
  $(this).addClass('not-created');
});

$('body').on('click', '#mult-m.not-created', function() {
  var html = '', i, j;
  var cols = prompt("How many columns will have the second matrix");
  matrix = new Matrix(M, cols);

    var html = '<table>';
    for (i = 0; i <= M - 1; i++) {
      html += '<tr>';
      for (j = 0; j <= cols - 1; j++) {
        html += "<td><input type='number' data-row='" + i + "' data-col='" + j + "' class='matrix'></td>";
      }
      html += '</tr>';
    }
    html += '</table>';

    $('#second-matrix').show();
    $('#second-matrix div.matrix').html(html);
    //$('#second-matrix').attr('data-operation', 'mult');
    $('#second-matrix').data('operation', 'mult');
    $('#second-matrix .count-rows, #second-matrix .count-cols, #second-matrix .input-matrix').hide();
    $(this).removeClass('not-created');
    $(this).addClass('created');
 });

$('body').on('click', '#mult-m.created', function() {
  var matrix1 = matrices[0];
  var matrix2 = matrices[1];
  console.log(matrix1.toString(), matrix2.toString());
  var mult = operations.multiply(matrix1, matrix2);
  console.log(mult.toString());
  $(this).removeClass('created');
  $(this).addClass('not-created');
});

});
