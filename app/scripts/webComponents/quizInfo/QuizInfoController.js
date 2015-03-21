/**
 * Created by guochen on 5/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.quiz.info')
    .controller('QuizInfoController', QuizInfoController);

  QuizInfoController.$inject = ['$scope', '$q', '$state', 'quizService'];
  function QuizInfoController($scope, $q, $state, quizService) {
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
        $state.go('app.quiz.questions.a.level0');
        $scope.$apply();
        return value;
      }

      function handleError(error) {
        $q.reject(error);
      }
    }

  }

}());
