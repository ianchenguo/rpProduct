/**
 * Created by guochen on 11/03/15.
 */

(function () {
  'use strict';
  angular
    .module('core.readableLog')
    .factory('readableLogDbService', readableLogDbService);

  readableLogDbService.$inject = ['dbService'];

  function readableLogDbService(dbService) {

    var service = {
      putReadableLogEntry: putReadableLogEntry,
      bulkPutReadableLogEntry:bulkPutReadableLogEntry,
      listAllReadableLogEntriesOfSingleQuiz: listAllReadableLogEntriesOfSingleQuiz
    };
    return service;
    //////

    function putReadableLogEntry(log) {

      return dbService.db
        .put(log)
        .then(function (value) {
          return value;
        })
        .catch(function (error) {
          throw new Error(error);
        });
    }

    function bulkPutReadableLogEntry(logs){
      return dbService.db
        .bulkDocs(logs)
        .then(function (value) {
          return value;
        })
        .catch(function (error) {
          throw new Error(error);
        });
    }

    function listAllReadableLogEntriesOfSingleQuiz(quizId) {
      return dbService.db
        .allDocs({
        include_docs: true,
        startkey: quizId + '_read',
        endkey: quizId + '_read\uffff'
      })
        .then(function (value) {
          return value.rows;
        })
        .catch(function (error) {
          throw new Error(error);
        });
    }
  }
}());
