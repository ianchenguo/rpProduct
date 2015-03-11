/**
 * Created by guochen on 5/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.quiz.questions')
    .directive('ceCardBase', ceCardBase);

  //////
  function ceCardBase(){
    return {
      restrict: 'E',
      templateUrl:'quiz/questions/common/directives/ceCardBase/ceCardBase.html',
      //replace:true,
      scope: {
        content:'='
      },
      controller: controller,
      controllerAs: 'vm',
      bindToController: true
    }

    //////
    function controller(){
      var vm = this;
    }
  }

}());
