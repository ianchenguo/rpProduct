/**
 * Created by guochen on 4/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.quiz.questions')
    .directive('ceTestBase', ceTestBase);

  //////
  function ceTestBase() {
    return {
      restrict: 'E',
      templateUrl: 'quiz/questions/common/directives/ceTestArea/ceTestBase/ceTestBase.html',
      scope: {
        title: '=',
        droppable: '='
      },
      controller: controller,
      controllerAs: 'vm',
      bindToController: true

    }

    //////
    function controller() {
      var vm = this;

    }
  }

}());
