/**
 * Created by guochen on 23/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.quiz.viewModel')
    .factory('Directive', Directive);

  Directive.$inject = ['STATE', 'DOC_TYPE'];
  function Directive(STATE, DOC_TYPE) {

    var Directive = function Directive(init) {
      var args, now;
      args = init || {
        endTimeStamp: '',
        touches: [],
        quiz: '',
        question: '',
        questionLevel: '',
        state: STATE.created,
        docType: DOC_TYPE.directive
      };
      now = new Date().toJSON();

      this._id = args.quiz + '_directive_' + now + Math.random();
      //this._id = 'directive_' + now + Math.random();
      this._rev = '';
      this.startTimeStamp = now;
      this.endTimeStamp = args.endTimeStamp;
      this.touches = args.touches || [];
      this.quiz = args.quiz;
      this.question = args.question;
      this.questionLevel = args.questionLevel;
      this.state = args.state;
      this.docType = args.docType;
    };


    return Directive;
  }

}());
