/**
 * Created by guochen on 4/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.questionCommon')
    .directive('ceTestBase', ceTestBase);

  ceTestBase.$inject = ['cardBaseService'];
  //////
  function ceTestBase(cardBaseService) {
    return {
      transclude: true,
      restrict: 'E',
      templateUrl: 'scripts/webComponents/questionCommon/directives/ceTestBase/ceTestBase.html',
      scope: {
        title: '=',
        droppableId: '=',
        shouldMatch: '@'
      },
      link: link,
      controller: controller,
      controllerAs: 'vm',
      bindToController: true

    }

    //////
    function controller() {
      var vm = this;
    }

    function link($scope, $el, $attrs) {
      $scope.$on('dropSuccess', _dropSuccessListener);

      function _dropSuccessListener() {

        var matchPattern = R.pipe(
          cardBaseService.updateCurrentPatternPosition,
          R.cond([
            R.eq('ce-test-base-x'),
            R.pipe(
              cardBaseService.testPatterns,
              R.cond([
                R.eq(true),
                R.pipe(
                  cardBaseService.logPatternMatch,
                  cardBaseService.makeSound
                )
              ])
            )
          ])
        );

        matchPattern(
          $el.attr('id'),
          $el.find('.ce-card').attr('id')
        );
      }
    }
  }

}());
