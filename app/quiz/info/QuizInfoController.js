/**
 * Created by guochen on 5/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.quiz.info')
    .controller('QuizInfoController', QuizInfoController);

  QuizInfoController.$inject = ['quizService']
  function QuizInfoController(quizService) {
    var vm = this;

    vm.test = 'test';

    vm.quizInfo = {
      observer: {
        firstName: '',
        lastName: '',
        email: ''
      },
      child: {
        firstName: '',
        lastName: '',
        age: '',
        gender: ''
      }
    }

    vm.submitInfo = submitInfo;

    //////
    function submitInfo(){
      return quizService.initQuiz(vm.quizInfo);
    }

  }

}());
