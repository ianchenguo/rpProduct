/**
 * Created by guochen on 4/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.quiz.questions')
    .directive('ceQuestionAFrame', ceQuestionAFrame);

  function ceQuestionAFrame(){
    return {
      restrict: 'E',
      templateUrl:'/scripts/questions/questionA/directives/ceQuestionAFrameDirective/ceQuestionAFrame.html'
    }
  }

}());
