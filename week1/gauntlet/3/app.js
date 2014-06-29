$(document).ready(function() {
  $("#search-button").click(function() {

    var img;
    img = document.createElement("img");
    img.src = $("#search-input").val();

    $("#remote-images").append(img);
  });

  $("#remote-images").on("click", "img", function() {
    $(this).remove();
  });

});
