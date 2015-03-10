/**
 * Created by guochen on 5/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.quizInfo')
    .controller('QuizInfoController', QuizInfoController);

  function QuizInfoController() {
    var vm = this;

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
  }

}());
