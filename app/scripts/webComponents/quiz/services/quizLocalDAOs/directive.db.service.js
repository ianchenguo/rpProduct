/**
 * Created by guochen on 11/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.quiz.localDAO')
    .factory('directiveDbService', directiveDbService);

  directiveDbService.$inject = ['dbService'];

  function directiveDbService(dbService) {

    var service = {
      getDirective: getDirective,
      putDirective: putDirective
    };
    return service;
    //////

    function getDirective(id) {
      return dbService.db.get(id);
    }

    function putDirective(directive) {
      return dbService.db.put(directive);
    }
  }

}());
