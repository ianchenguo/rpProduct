///**
// * Created by guochen on 13/03/15.
// */
//
//(function () {
//  'use strict';
//  describe('questionService', function () {
//
//    //init testing env
//    var questionService;
//    beforeEach(module('app'));
//    beforeEach(inject(function (_questionService_) {
//      questionService = _questionService_;
//    }));
//
//    var mockQuestionData = {
//      type: 'a'
//    };
//
//    //test getQuestion()
//    describe('getQuestion()', function () {
//
//      it('should exist', function () {
//        expect(questionService.getQuestion).to.be.not.undefine;
//      });
//
//      it('should retrive a question object', function () {
//        expect(questionService.getQuestion()).to.be.instanceOf(Object);
//      });
//
//      //test question objecct
//      describe('question object', function () {
//
//        it('should have a id', function () {
//          expect(questionService.getQuestion().id).to.be.not.undefine;
//        });
//
//        it('should have a start time stamp', function () {
//          expect(questionService.getQuestion().startTimeStamp).to.be.not.undefine;
//        });
//
//        it('should have a end time stamp', function () {
//          expect(questionService.getQuestion().endTimeStamp).to.be.not.undefine;
//        });
//
//        it('should have a type', function () {
//          expect(questionService.getQuestion().type).to.be.not.undefine;
//        });
//
//        it('should have a list of levels', function () {
//          expect(questionService.getQuestion().levels).to.be.instanceOf(Array);
//        });
//      });
//    });
//
//    //test clearQuestion()
//    describe('clearQuestion()', function () {
//      it('should clear all properties of the question object', function () {
//        questionService.clearQuestion();
//        expect(questionService.getQuestion().id).to.equal('');
//        expect(questionService.getQuestion().startTimeStamp).to.equal('');
//        expect(questionService.getQuestion().endTimeStamp).to.equal('');
//        expect(questionService.getQuestion().type).to.equal('');
//        expect(questionService.getQuestion().levels).to.be.instanceOf(Array);
//        expect(questionService.getQuestion().levels).to.be.empty;
//      });
//    });
//
//    //test initQuestion()
//    describe('initQuestion()', function () {
//      it('should populate the question with data', function () {
//        questionService.initQuestion(mockQuestionData);
//        expect(questionService.getQuestion().id).to.match(/^\d+$/);
//        expect(questionService.getQuestion().startTimeStamp).to.match(/^\d+$/);
//        expect(questionService.getQuestion().endTimeStamp).to.equal('');
//        expect(questionService.getQuestion().type).to.equal(mockQuestionData.type);
//        expect(questionService.getQuestion().levels).to.be.empty;
//      });
//    });
//
//    //test finaliseQuestion()
//    describe('finaliseQuestion()', function () {
//
//      it('should check if the question is populated', function () {
//        questionService.clearQuestion();
//        expect(questionService.finaliseQuestion()).to.equal(false);
//        expect(questionService.getQuestion().endTimeStamp).to.equal('');
//      });
//
//      it('should populate the question with end time stamp', function () {
//        questionService.initQuestion(mockQuestionData);
//        questionService.finaliseQuestion();
//        expect(questionService.getQuestion().endTimeStamp).to.match(/^\d+$/);
//      });
//    });
//
//    //test insertLevels()
//    describe('insertLevels()', function () {
//
//      beforeEach(function () {
//        questionService.initQuestion(mockQuestionData);
//      });
//
//      it('should check incoming data is a level object', function () {
//        expect(questionService.insertLevel({dummy: 'dummy'})).to.equal(false);
//        expect(questionService.levels).to.be.empty;
//      });
//
//      it('should insert a level object into the question object', function () {
//        function QuestionLevel(init) {
//          this.id = init.id;
//        }
//        var mockLevel = new QuestionLevel({id: 1});
//        expect(questionService.insertLevel(mockLevel)).to.equal(true);
//        expect(questionService.getQuestion().levels[0]).to.equal(mockLevel);
//      })
//    });
//  });
//
//}());
