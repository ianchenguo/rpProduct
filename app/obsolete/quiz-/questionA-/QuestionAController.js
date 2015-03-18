/**
 * Created by guochen on 4/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.quiz.questions.questionA')
    .controller('QuestionAController', QuestionAController);

  QuestionAController.$inject = ['$state','replayService'];

  function QuestionAController($state,replayService) {
    var vm = this;
    vm.level = $state.current.data.level;
    console.log('vm.level: ' + vm.level);

    vm.test = test;



    //////
    function test() {
      replayService.playCursor();
    }
  }
}());
