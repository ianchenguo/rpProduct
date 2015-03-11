/**
 * Created by guochen on 4/03/15.
 */

(function () {
    'use strict';
  angular
    .module('app.quiz.questions')
    .controller('QuestionAController',QuestionAController);

    QuestionAController.$inject = ['replayService'];

  function QuestionAController(replayService){
    var vm = this;

    vm.test = test;



    //////
    function test() {
      replayService.playCursor();
    }
  }
}());
