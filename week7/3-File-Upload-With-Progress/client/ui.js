require.config({
  paths: {
    "handlebars" : "bower_components/handlebars/handlebars",
    "jquery" : "bower_components/jquery/dist/jquery",
  },
  shim: {
    "handlebars": {
      exports: "Handlebars"
    }
  }
});

define(["handlebars", "jquery"], function(Handlebars, $) {
  function UI() {
    var source = $('#progressbar').html();
    var template = Handlebars.compile(source);

    this.drawProgress = function(progress) {
      var html = template({
        'progress' : progress
      });

      $('#progress').html(html);
    };
  }

  return UI;
});
