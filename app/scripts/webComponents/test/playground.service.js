/**
 * Created by guochen on 26/03/15.
 */

(function () {
  'use strict';
  angular
    .module('test.playground')
    .factory('playgroundService', playgroundService);

  function playgroundService(dbService) {

    var service = {
      queryQuizzesByState: queryQuizzesByState




    };

    return service;
    //////
    function queryQuizzesByState() {

    }

  }
}());
