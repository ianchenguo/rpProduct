/**
 * Created by guochen on 4/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.quiz.questions')
    .directive('ceQuestionAInitialArea', ceQuestionAInitialArea);

  function ceQuestionAInitialArea(){
    return {
      restrict: 'E',
      templateUrl:'quiz/questions/questionA/directives/ceQuestionAFrameDirective/ceQuestionAInitialArea/ceQuestionAInitialArea.html',
      scope: {},
      controllerAs: 'vm',
      controller: controller,
      bindToController: true
      //replace:true
    }

    //////
    function controller(){
      var vm = this;

      vm.components = [
        {id:'q-a-01',content: 'A'},
        {id:'q-a-02',content: 'B'},
        {id:'q-a-03',content: 'C'}
      ]
    }
  }

}());
