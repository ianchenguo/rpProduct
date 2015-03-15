/**
 * Created by guochen on 13/03/15.
 */

(function () {
  'use strict';

  //tests view model Question
  describe('Question', function () {

    //prepares testing env
    var Quiz, Child, Observer, Device, Question, STATE, QUESTION_TYPE, GENDER;
    beforeEach(module('app'));
    beforeEach(inject(function (_Quiz_, _Child_, _Observer_, _Device_, _Question_, _STATE_, _QUESTION_TYPE_, _GENDER_) {

      Quiz = _Quiz_;
      Child = _Child_;
      Observer = _Observer_;
      Device = _Device_;
      GENDER = _GENDER_;
      Question = _Question_;
      STATE = _STATE_;
      QUESTION_TYPE = _QUESTION_TYPE_;
    }));

    //prepares mock data
    var mockQuestions, mockChild, mockObserver, mockDevice, mockQuizData;
    beforeEach(function () {

      mockQuestions = [new Question({endTimeStamp: '', type: QUESTION_TYPE.a, state: STATE.created, levels: ''})];
      mockChild = new Child({firstName: 'Sam', lastName: 'Fisher', age: 8, gender: GENDER.male});
      mockObserver = new Observer({firstName: 'Sam', lastName: 'Fisher', email: 'sam.fisher@jmail.com'});
      mockDevice = new Device({uuid: 'D-U-M-M-Y-U-U-I-D', platform: 'iPad',version:'7.1'});
      mockQuizData = {
        child: mockChild,
        observer: mockObserver,
        platform: mockDevice,
        endTimeStamp: '',
        state: STATE.created,
        questions: mockQuestions
      };
    });

    //tests properties
    it('should have an id', function () {
      expect(new Quiz(mockQuizData)._id).to.match(/^quiz_\d\d\d\d-\d\d-\d\d\w\d\d:\d\d:\d\d.\d\d\d\w$/);
    });

    it('should have a rev', function(){
      expect(new Quiz(mockQuizData)._rev).to.exist;
    });

    it('should have a start time stamp', function () {
      expect(new Quiz(mockQuizData).startTimeStamp).to.match(/^\d\d\d\d-\d\d-\d\d\w\d\d:\d\d:\d\d.\d\d\d\w$/);
    });

    it('should have an end time stamp', function () {
      expect(new Quiz(mockQuizData).endTimeStamp).to.equal(mockQuizData.endTimeStamp);
    });

    it('should have a state', function () {
      expect(new Quiz(mockQuizData).state).to.equal(mockQuizData.state);
    });

    it('should have an array of Quizs objects', function () {
      expect(new Quiz(mockQuizData).questions).to.equal(mockQuestions);
    });

    describe('addQuestion()', function () {
      it('should add a level object into the levels property', function () {
        var newQuestion = new Question({endTimeStamp: '', type: QUESTION_TYPE.a, state: STATE.created, levels: ''});
        var quiz = new Quiz(mockQuizData);
        quiz.addQuestion(newQuestion);
        expect(quiz.questions).to.contain(newQuestion);
      });
    })
  });
}());
