/**
 * Created by guochen on 5/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.quizInfo')
    .controller('QuizInfoController', QuizInfoController);

  QuizInfoController.$inject = ['$q', '$state', 'quizService'];
  function QuizInfoController($q, $state, quizService) {
    var vm = this;

    vm.child = {firstName: '', lastName: '', age: '', gender: ''};
    vm.observer = {firstName: '', lastName: '', email: ''};

    vm.submitInfo = submitInfo;

    //////
    function submitInfo() {
      return quizService
        .createQuiz(vm.child, vm.observer)
        .then(handleSuccess)
        .catch(handleError);

      ///
      function handleSuccess(value) {
        $state.go('app.quiz.questionA.level0');
        return value;
      }

      function handleError(error) {
        $q.reject(error);
      }
    }

  }

}());
