/**
 * Created by guochen on 4/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.questionCommon')
    .directive('ceTestArea', ceTestArea);

  //////
  function ceTestArea() {
    return {
      restrict: 'E',
      templateUrl: 'scripts/webComponents/questionCommon/directives/ceTestArea/ceTestArea.html',
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

      //console.log('vm.level: ' + vm.level);

      vm.testComponents = [
        [{title: '1', droppable: true, droppableId: 'droppable1', visibility: 'visible'},
          {title: '2', droppable: true, droppableId: 'droppable2', visibility: 'visible'},
          {title: '3', droppable: true, droppableId: 'droppable3', visibility: 'visible'}]
        , [{title: 'placeholder', droppable: false, visibility: 'hidden'},
          {title: 'X', droppable: true, droppableId: 'droppable4', visibility: 'visible'},
          {title: 'placeholder', droppable: false, visibility: 'hidden'}]
      ]
    }

    function link(scope, el, attrs) {

    }
  }

}());
