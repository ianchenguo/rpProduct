/**
 * Created by guochen on 4/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.quiz.questions')
    .directive('cePopulatedTestArea', cePopulatedTestArea);

  //////
  function cePopulatedTestArea() {
    return {
      restrict: 'E',
      templateUrl: 'scripts/webComponents/questions/directives/cePopulatedTestArea/cePopulatedTestArea.html',
      scope: {
        content: '@',
        level: '@'
      },
      controller: controller,
      controllerAs: 'vm',
      bindToController: true,
      link: link

    }

    //////
    function controller() {
      var vm = this;

      console.log('vm.level: ' + vm.level);

      vm.testComponents = [
        [{title: '1', droppable: true, visibility: 'visible', card: {id: 'q-a-d-02', content: 'B', color: 'green'}},
          {title: '2', droppable: true, visibility: 'visible', card: {id: 'q-a-d-03', content: 'C', color: 'blue'}},
          {title: '3', droppable: true, visibility: 'visible', card: {id: 'q-a-d-01', content: 'A', color: 'red'}}]
        , [{title: 'placeholder', droppable: true, visibility: 'hidden'},
          {title: 'X', droppable: true, visibility: 'visible'},
          {title: 'placeholder', droppable: true, visibility: 'hidden'}]
      ]
    }

    function link(scope, el, attrs) {

    }
  }

}());
