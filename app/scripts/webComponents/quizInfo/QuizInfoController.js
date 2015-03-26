/**
 * Created by guochen on 5/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.quizInfo')
    .controller('QuizInfoController', QuizInfoController);

  QuizInfoController.$inject = ['$q', '$state', 'quizService','LEVEL_TYPE'];
  function QuizInfoController($q, $state, quizService,LEVEL_TYPE) {
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
        console.log(value);
        console.log($state.href('app.quiz.questionA.levels', {level:LEVEL_TYPE.zero}));
        $state.go('app.quiz.questionA.levels',{level:LEVEL_TYPE.zero});

        return value;
      }

      function handleError(error) {
        $q.reject(error);
      }
    }

  }

}());
