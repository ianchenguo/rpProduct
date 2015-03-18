/**
 * Created by guochen on 12/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.quiz.questions')
    .factory('questionService', questionService);

  function questionService() {

    var _question;

    var service = {
      getQuestion: getQuestion,
      clearQuestion:clearQuestion,
      initQuestion:initQuestion,
      finaliseQuestion:finaliseQuestion,
      insertLevel:insertLevel
    }
    return service;
    //////
    function getQuestion() {
      _checkQuestion();
      return _question;
    }

    function Question(init) {
      this.id = init.id;
      this.startTimeStamp = init.startTimeStamp;
      this.endTimeStamp = init.endTimeStamp;
      this.type = init.type;
      this.levels = init.levels;
    }

    function _checkQuestion() {
      if (!_question) {
        _createQuestion();
      }
    }

    function _createQuestion(){
      _question = new Question({id:'',startTimeStamp:'',endTimeStamp:'',type:'',levels:[]});
    }

    function clearQuestion(){
      _createQuestion();
    }

    function initQuestion(data){
      _checkQuestion();

      var now = Date.now();
      _question.id = now;
      _question.startTimeStamp = now;
      _question.type = data.type;
    }

    function finaliseQuestion(){
      if(!_question || !_question.id) {
        return false;
      } else {
        _question.endTimeStamp = Date.now();
        return true;
      }
    }

    function insertLevel(level){
      if(level.constructor && level.constructor.name === 'QuestionLevel') {
        _question.levels.push(level);
        return true;
      } else {
        return false;
      }
    }
  }

}());
