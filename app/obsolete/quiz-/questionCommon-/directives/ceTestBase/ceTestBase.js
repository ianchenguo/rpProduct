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
      transclude:true,
      restrict: 'E',
      templateUrl: 'quiz/questionCommon/directives/ceTestBase/ceTestBase.html',
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
