/**
 * Created by guochen on 4/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.sideMenu')
    .directive('ceSideMenuAsideQuiz', ceSideMenuAsideQuiz);

  ceSideMenuAsideQuiz.$inject = ['$state', 'questionLevelService', 'questionService', 'quizService']
  function ceSideMenuAsideQuiz($state, questionLevelService, questionService, quizService) {
    return {
      restrict: 'E',
      templateUrl: 'scripts/webComponents/sideMenu/directives/ceSideMenuAsideQuiz/ceSideMenuAsideQuiz.html',
      scope: {},
      controllerAs: 'vm',
      controller: controller,
      bindToController: true
    }

    function controller() {
      var vm = this;
      vm.endQuiz = endQuiz;
    }

    //////
    function endQuiz() {
      return questionLevelService
        .finishQuestionLevel()
        .then(function () {
          return questionService.finishQuestion();
        })
        .then(function () {
          return quizService.finishQuiz();
        })
        .then(function () {
          $state.go('app.welcome');
        })
    }
  }

}());
