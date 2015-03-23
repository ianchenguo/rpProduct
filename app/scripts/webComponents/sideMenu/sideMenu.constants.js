/**
 * Created by guochen on 15/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.sideMenu')
    .constant({
      APP_MODE: {
        quiz: 'quiz',
        general: 'general',
        replay: 'replay'
      }
    });
}());
