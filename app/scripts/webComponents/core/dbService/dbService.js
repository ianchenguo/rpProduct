/**
 * Created by guochen on 15/03/15.
 */

(function () {
    'use strict';
    angular
      .module('core.dbService')
      .factory('dbService', dbService);

  dbService.$inject = ['pouchDB']
  function dbService(pouchDB) {

    var db = pouchDB('cedb', {adapter:'websql'});

    var service = {
      db: db
    };

    return service;
  }

}());
