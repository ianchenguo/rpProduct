/**
 * Created by guochen on 5/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.welcome')
    .controller('WelcomeController', WelcomeController);

  function WelcomeController(dbService) {
    var vm = this;

    vm.deleteDb = function() {
      dbService.deleteDb();
      dbService.createDb();
    }
  }
}());
