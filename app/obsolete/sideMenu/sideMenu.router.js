/**
 * Created by guochen on 9/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.sideMenu')
    .config(config);

  config.$inject = ['$stateProvider'];
  function config($stateProvider) {

    $stateProvider
      .state('app', {
        abstract: true,
        templateUrl: 'sideMenu/sideMenu.html'
      })
  }

}());
