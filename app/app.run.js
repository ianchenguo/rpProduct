/**
 * Created by guochen on 9/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app')
    .config(function ($ionicConfigProvider) {
      $ionicConfigProvider.views.maxCache(0);

    })
    .run(function ($ionicPlatform) {
      $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
          StatusBar.styleDefault();
        }
      });
    });
}());
