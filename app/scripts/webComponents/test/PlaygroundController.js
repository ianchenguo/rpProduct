/**
 * Created by guochen on 26/03/15.
 */

(function () {
  'use strict';
  angular
    .module('test.playground')
    .controller('PlaygroundController',PlaygroundController);


  function PlaygroundController(dbService) {
    var vm = this;
    vm.testQuery = queryQuizzesByState;

    function queryQuizzesByState() {

      console.log('in');

      function myMap(doc) {
        if (doc.docType === "quiz") {
          emit([doc._id, 0], doc);
        }
        else if (doc.docType === "question") {
          emit([doc.quiz, 1], doc);
        }
        else if (doc.docType === "questionLevel") {
          emit([doc.questionLevel, 2], doc);
        }
        else if (doc.docType === "directive") {
          emit([doc.directive, 3], doc);
        }
      }

      return dbService.db
        .query(myMap,
        {
          include_docs: true
        })
        .then(function(value) {
          console.log(value);
          return value;
        });
    }
  }
}());
