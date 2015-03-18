/**
 * Created by guochen on 13/03/15.
 */

(function () {
  'use strict';

  //tests view model QuestionLevel
  describe('QuestionLevel', function () {

    //prepares testing env
    var QuestionLevel, STATE, LEVEL_TYPE;
    beforeEach(module('app'));
    beforeEach(inject(function (_QuestionLevel_, _STATE_, _LEVEL_TYPE_) {
      QuestionLevel = _QuestionLevel_;
      STATE = _STATE_;
      LEVEL_TYPE = _LEVEL_TYPE_;
    }));

    //solves 'Unexpected request" error, not working properly
    beforeEach(inject(function ($httpBackend) {
      $httpBackend.expectGET("quiz/questionA/questionA.html").respond("<div>mock template</div>");
      $httpBackend.expectGET("quiz/info/quizInfo.html").respond("<div>mock template</div>");
      $httpBackend.expectGET("sideMenu/sideMenu.html").respond("<div>mock template</div>");
      $httpBackend.expectGET("welcome/welcome.html").respond("<div>mock template</div>");
    }));

    //prepares mock data
    var mockLevelData;
    beforeEach(function () {
      mockLevelData= {
        endTimeStamp:'',
        type:LEVEL_TYPE.zero,
        state:STATE.created,
        question:'question_dummy_id'
      }
    });

    //tests properties
    it('should have an id', function () {
      //2015-03-14T23:58:19.002Z
      expect(new QuestionLevel(mockLevelData)._id).to.match(/^level_\d\d\d\d-\d\d-\d\d\w\d\d:\d\d:\d\d.\d\d\d\w$/);
    });

    it('should have a rev', function(){
      expect(new QuestionLevel(mockLevelData)._rev).to.exist;
    });

    it('should have a start time stamp', function () {
      expect(new QuestionLevel(mockLevelData).startTimeStamp).to.match(/^\d\d\d\d-\d\d-\d\d\w\d\d:\d\d:\d\d.\d\d\d\w$/);
    });

    it('should have an end time stamp', function () {
      expect(new QuestionLevel(mockLevelData).endTimeStamp).to.equal(mockLevelData.endTimeStamp);
    });

    it('should have a type', function () {
      expect(new QuestionLevel(mockLevelData).type).to.equal(mockLevelData.type);
    });

    it('should have a state', function () {
      expect(new QuestionLevel(mockLevelData).state).to.equal(mockLevelData.state);
    });

    it('should have a question reference', function () {
      expect(new QuestionLevel(mockLevelData).question).to.equal(mockLevelData.question);
    });
  });
}());
