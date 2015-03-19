/**
 * Created by guochen on 5/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.quiz.info')
    .controller('QuizInfoController', QuizInfoController);

  QuizInfoController.$inject = ['$q','$state', '$ionicPlatform', 'quizService']
  function QuizInfoController($q,$state, $ionicPlatform, quizService) {
    var vm = this;

    vm.child = {firstName: '', lastName: '', age: '', gender: ''};
    vm.observer = {firstName: '', lastName: '', email: ''};

    vm.submitInfo = submitInfo;

    //////
    function submitInfo() {

      var deferred = $q.defer();

      $ionicPlatform.ready(function(){
        quizService.createQuiz(vm.child,vm.observer).then(handleSuccess,handleError);
      });

      return deferred.promise;
      ///
      function handleSuccess(value) {
        deferred.resolve(value);
        $state.go('app.quiz.questions.a.level0');
      }
      function handleError(error) {
        deferred.reject(error);
      }
    }

  }

}());
