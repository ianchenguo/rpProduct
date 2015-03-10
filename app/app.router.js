/**
 * Created by guochen on 9/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app')
    .config(config);

  config.$inject = ['$urlRouterProvider'];
  function config($urlRouterProvider) {
    $urlRouterProvider.otherwise('/welcome');
  }

}());
