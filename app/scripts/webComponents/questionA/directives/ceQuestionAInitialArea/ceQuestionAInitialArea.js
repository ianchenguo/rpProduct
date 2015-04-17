/**
 * Created by guochen on 4/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.questionA')
    .directive('ceQuestionAInitialArea', ceQuestionAInitialArea);

  function ceQuestionAInitialArea(){
    return {
      restrict: 'E',
      templateUrl:'scripts/webComponents/questionA/directives/ceQuestionAInitialArea/ceQuestionAInitialArea.html',
      scope: {},
      controllerAs: 'vm',
      controller: controller,
      bindToController: true
    }


    //////
    function controller(){
      var vm = this;

      vm.components = [
        {id:'question-a-img-a1',cardImgUrl:'images/card-img-a1.png'},
        {id:'question-a-img-a2',cardImgUrl:'images/card-img-a2.png'},
        {id:'question-a-img-a3',cardImgUrl:'images/card-img-a3.png'}
      ];
    }
  }

}());
