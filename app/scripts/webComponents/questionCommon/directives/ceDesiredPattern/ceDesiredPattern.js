/**
 * Created by guochen on 4/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.questionCommon')
    .directive('ceDesiredPattern', ceDesiredPattern);

  //////
  function ceDesiredPattern() {
    return {
      restrict: 'E',
      templateUrl: 'scripts/webComponents/questionCommon/directives/ceDesiredPattern/ceDesiredPattern.html',
      scope: {
        content: '@',
        direction: '@'
      },
      controller: controller,
      controllerAs: 'vm',
      bindToController: true
    }

    //////
    function controller() {
      var vm = this;

      //the desired pattern contains three components
      vm.components = [[
        {id:'question-a-img-a1',cardImgUrl:'images/card-img-a1.png'},
        {id:'question-a-img-a2',cardImgUrl:'images/card-img-a2.png'},
        {id:'question-a-img-a3',cardImgUrl:'images/card-img-a3.png'}
      ],[
        {id:'question-a-img-a1',cardImgUrl:'images/card-img-b1.png'},
        {id:'question-a-img-a2',cardImgUrl:'images/card-img-b2.png'},
        {id:'question-a-img-a3',cardImgUrl:'images/card-img-b3.png'}
      ]];
    }
  }

}());
