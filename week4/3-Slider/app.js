"use strict";

var imageSearch;
var curPage = 0;

  google.setOnLoadCallback(OnLoad);

  function OnLoad() {
    // Create an Image Search instance.
    imageSearch = new google.search.ImageSearch();
    // Set searchComplete as the callback function when a search is
    // complete.  The imageSearch object will have results in it.
    imageSearch.setSearchCompleteCallback(this, searchComplete, null);
    imageSearch.setResultSetSize(1);
  }

  function searchComplete() {
    // Check that we got results
    if (imageSearch.results && imageSearch.results.length > 0) {

      // Grab our content div, clear it.
      var contentDiv = document.getElementById('content');
      contentDiv.innerHTML = '';

      // Loop through our results, printing them to the page.
      var results = imageSearch.results;

      for (var i = 0; i < results.length; i++) {

        // For each result write it's title and image to the screen
        var result = results[i];
        var imgContainer = document.createElement('div');
        var title = document.createElement('div');

        // We use titleNoFormatting so that no HTML tags are left in the
        // title
        title.innerHTML = result.titleNoFormatting;
        var newImg = document.createElement('img');

        // There is also a result.url property which has the escaped version
        newImg.src = result.tbUrl;

        imgContainer.appendChild(title);
        imgContainer.appendChild(newImg);

        // Put our title + image in the content
        contentDiv.appendChild(imgContainer);
      }

      // Now add links to additional pages of search results.
      addPaginationLinks(imageSearch);
    }
  }

  function addPaginationLinks(imageSearch) {
    // To paginate search results, use the cursor function.
    var pages = imageSearch.cursor.pages;

    var prevPage = curPage === 0 ? "undefined" : curPage - 1;
    var nextPage = curPage + 1;

    // Create links to other pages using gotoPage() on the searcher.
    if (prevPage != "undefined") {
      var l_link = document.getElementById('left');
      l_link.href= "javascript:imageSearch.gotoPage("+ prevPage +'); curPage--';
    }

    var r_link = document.getElementById('right');
    r_link.href= "javascript:imageSearch.gotoPage("+ nextPage +'); curPage++';
  }


$(document).ready(function() {
  $("#load-images").click(function() {
    imageSearch.execute($("#load-images-input").val());
  });
});
