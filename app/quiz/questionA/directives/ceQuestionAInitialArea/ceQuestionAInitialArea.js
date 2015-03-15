/**
 * Created by guochen on 4/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.quiz.questions.questionA')
    .directive('ceQuestionAInitialArea', ceQuestionAInitialArea);

  function ceQuestionAInitialArea(){
    return {
      restrict: 'E',
      templateUrl:'quiz/questionA/directives/ceQuestionAInitialArea/ceQuestionAInitialArea.html',
      scope: {},
      controllerAs: 'vm',
      controller: controller,
      bindToController: true
    }


    //////
    function controller(){
      var vm = this;

      vm.components = [
        {id:'q-a-d-01',content: 'A', color:'red'},
        {id:'q-a-d-02',content: 'B', color:'green'},
        {id:'q-a-d-03',content: 'C', color:'blue'}
      ]
    }
  }

}());
