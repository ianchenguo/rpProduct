/**
 * Created by guochen on 4/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.quiz.questions')
    .directive('ceTestArea', ceTestArea);

  //////
  function ceTestArea() {
    return {
      restrict: 'E',
      templateUrl: 'quiz/questions/common/directives/ceTestArea/ceTestArea.html',
      scope: {
        content: '@'
      },
      controller: controller,
      controllerAs: 'vm',
      bindToController: true

    }

    //////
    function controller() {
      var vm = this;

      vm.testComponents = [
        [{title: '1', droppable: true, visibility: 'visible'},
          {title: '2', droppable: true, visibility: 'visible'},
          {title: '3', droppable: true, visibility: 'visible'}]
        , [{title: 'placeholder', droppable: true, visibility: 'hidden'},
          {title: 'X', droppable: true, visibility: 'visible'},
          {title: 'placeholder', droppable: true, visibility: 'hidden'}]
      ]
    }
  }

}());
