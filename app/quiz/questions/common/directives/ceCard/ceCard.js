/**
 * Created by guochen on 5/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.quiz.questions')
    .directive('ceCard', ceCard);

  //////
  function ceCard(){
    return {
      restrict: 'E',
      templateUrl:'quiz/questions/common/directives/ceCard/ceCard.html',
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
