"use strict";

require.config({
  paths: {
    "jquery" : "bower_components/jquery/dist/jquery",
    "Q": "bower_components/q/q"
  }
});

require(["jquery", "Q", "ui"], function ($, Q, UI) {

  $(document).ready(function() {
    var doc = document.documentElement;

    doc.ondragover = function () {
      this.className = 'hover';
      return false;
    };

    doc.ondragend = function () {
      this.className = '';
      return false;
    };

    doc.ondrop = function (event) {
      event.preventDefault();
      this.className = '';

      var promise = uploadFiles(event.dataTransfer.files);

      promise.progress(function(progress) {
        var ui = new UI();
        ui.drawProgress(progress * 100);
      });
    };

  function uploadFiles(files) {
    var defer = Q.defer();
    var formData = new FormData();

    for (var i = 0; i < files.length; i++) {
      formData.append('filedata', files[i]);
    }

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/fileUpload');

    xhr.onprogress = function(event) {
      defer.notify(event.loaded / event.total);

      console.log(event.loaded / event.total);
    };

    xhr.onload = function () {
      if (xhr.status === 200) {
        defer.resolve('all done: ' + xhr.status);
      } else {
        defer.reject(new Error('Something went terribly wrong...'));
      }
    };

    xhr.send(formData);
    return defer.promise;
  }

  });

});

