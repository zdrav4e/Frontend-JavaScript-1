$(document).ready(function () {

  $("#highlight").click(function () {
    var hparagraph = $("div#mightyParagraphHolder p.highlight");

    if (hparagraph.length !== 0) {
      hparagraph = hparagraph[0];

      $(hparagraph).removeClass("highlight");

      if ($(hparagraph).next("p").length !== 0) {
        $(hparagraph).next("p").addClass("highlight");
      }
      else {
        $(".first").addClass("highlight");
      }
    } else {
      $(".first").addClass("highlight");
    }

  });

});
