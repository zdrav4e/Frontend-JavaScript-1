"use strict";

jQuery(document).ready(function () {

  var bookData = [];
  var bookTemplate = $("#single-book-template").html();
  var cartBookTemplate = $("#cart-single-book").html();
  var bookDescriptionTemplate = $("#book-description-template").html();


var Cart = (function () {
  var books = {};
  var num_pages = 0;

  return {
    add: function(book) {

      if (typeof books[book.isbn] === 'undefined') {
        book.times_ordered = 1;
        books[book.isbn] = book;
      }
      else {
        books[book.isbn].times_ordered++;
      }
      num_pages += book.num_pages;
      return books[book.isbn].times_ordered;
    },

    remove: function(book) {
      num_pages -= books[book.isbn].times_ordered * book.num_pages;
      delete books[book.isbn];
    },

    getNumPages : function () {
      return num_pages;
    }
  };
}());

  function getBookByISBN(isbn, bookData){
    return bookData.filter(function(book){
      return parseInt(isbn, 10) === parseInt(book.isbn, 10);
    }).shift();
  }

  $.getJSON("http://localhost:3000/books", function(data) {

    var count = 0;

    bookData = Object.create(data);

    data.forEach(function(bookObj, index, bookData) {
      if (typeof bookObj.title !== "undefined") {
        bookObj.title = he.decode(bookObj.title);
      }
      /*if (bookObj.description && typeof bookObj.description !== "undefined") {
        bookObj.description = he.decode(bookObj.description);
      }*/
      var output = _.template(bookTemplate, bookObj);
      var newrow = $("#books");
      if (count % 3 === 0) {
        newrow.append($("<div class='row'></div>"));
      }
      newrow.append(output);
      count++;
    });

  });

  $("#books").on("click", ".add-to-cart", function () {
    var bookObj = getBookByISBN($(this).parent().find(".isbn").text(), bookData),
        output = "";

    var times_ordered = Cart.add(bookObj);

    $("#num_pages").html(Cart.getNumPages());
    output = _.template(cartBookTemplate, bookObj);

    if (times_ordered === 1) {
      $("#books-in-cart").append(output);
    }
    else if (times_ordered > 1) {
      $("#books-in-cart [data-isbn='" + bookObj.isbn + "'] .times-ordered").html(times_ordered);
    }

  });

  $("#books-in-cart").on("click", ".remove-from-cart", function () {
    var bookObj = getBookByISBN($(this).parent().find(".isbn").text(), bookData);

    Cart.remove(bookObj);

    $(this).parent().remove();
    $("#num_pages").html(Cart.getNumPages());
  });

  $("#books").on("click", ".read-description", function () {
    var bookObj = getBookByISBN($(this).parent().find(".isbn").text(), bookData);
    var output = _.template(bookDescriptionTemplate, bookObj);

    var modal = $(output);
    modal.modal();

  });

});
