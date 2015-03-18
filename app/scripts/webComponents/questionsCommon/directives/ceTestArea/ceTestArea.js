/**
 * Created by guochen on 4/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.quiz.questions.common')
    .directive('ceTestArea', ceTestArea);

  //////
  function ceTestArea() {
    return {
      restrict: 'E',
      templateUrl: 'scripts/webComponents/questionsCommon/directives/ceTestArea/ceTestArea.html',
      scope: {
        content: '@',
        level:'@'
      },
      controller: controller,
      controllerAs: 'vm',
      bindToController: true,
      link:link

    }

    //////
    function controller() {
      var vm = this;

      console.log('vm.level: ' + vm.level);

      vm.testComponents = [
        [{title: '1', droppable: true, visibility: 'visible'},
          {title: '2', droppable: true, visibility: 'visible'},
          {title: '3', droppable: true, visibility: 'visible'}]
        , [{title: 'placeholder', droppable: true, visibility: 'hidden'},
          {title: 'X', droppable: true, visibility: 'visible'},
          {title: 'placeholder', droppable: true, visibility: 'hidden'}]
      ]
    }

    function link(scope,el,attrs){

    }
  }

}());
