/**
 * Created by guochen on 4/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.quiz.questions.questionA')
    .controller('QuestionAController', QuestionAController);

  QuestionAController.$inject = ['$state','replayService','QUESTION_TYPE'];

  function QuestionAController($state,replayService,QUESTION_TYPE) {
    var vm = this;
    vm.level = $state.current.data.level;
    console.log('vm.level: ' + vm.level);

    initialise();


    //////
    //function test() {
    //  replayService.playCursor();
    //}

    function initialise() {






      questionService
        .createQuestion(QUESTION_TYPE.a)
        .then(function(){
          return questionLevelService.createQuestionLevel(vm.level);
        });

    }
  }
}());
