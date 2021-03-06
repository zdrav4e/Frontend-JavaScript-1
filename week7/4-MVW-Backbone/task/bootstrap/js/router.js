/* global Backbone, $ */

var GitHubApp = GitHubApp || {};

var GitHubAppRouter = Backbone.Router.extend({
  routes: {
    // Add the appropriate routes
    '' : 'home',
    'user/:username' : 'user',
    'statistics' : 'stats'
  },
  initialize: function () {
    'use strict';
    this.users = new GitHubApp.Models.UserCollection();
  },
  home: function () {
    console.log('here');
    'use strict';
    // Invoke the FrontCtrl.setView and FrontCtrl.render
    // with appropriate parameters
    GitHubApp.Controllers.FrontCtrl.setView({
      partial: 'partials/home.tpl',
      view   : GitHubApp.Views.Home,
      model  : this.users
    });
    GitHubApp.Controllers.FrontCtrl.render();

  },
  user: function (login) {
    'use strict';
    var match = this.users.where({ login: login }),
        user;
    if (!match || !match.length) {
      user = new GitHubApp.Models.User({
        login: login
      });
      this.users.add(user);
    } else {
      user = match[0];
    }
    user.fetch()
    .done(function () {
      // Invoke the FrontCtrl.setView and FrontCtrl.render
      // with appropriate parameters
      GitHubApp.Controllers.FrontCtrl.setView({
        partial: 'partials/user.tpl',
        view   : GitHubApp.Views.User,
        model  : this.users
      });
      GitHubApp.Controllers.FrontCtrl.render();
    });
  },
  stats: function () {
    'use strict';
    $.when.apply($, this.users.map(function (user) {
      console.log(user.fetch());
      return user.fetch();
    }))
    .done(function (users) {
      console.log(users);
      GitHubApp.Controllers.FrontCtrl.setView({
        partial: 'partials/stats.tpl',
        view   : GitHubApp.Views.Stats,
        model  : users
      });
    GitHubApp.Controllers.FrontCtrl.render();
  });
}
});

GitHubApp.router = new GitHubAppRouter();

Backbone.history.start();
