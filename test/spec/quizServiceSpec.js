///**
// * Created by guochen on 11/03/15.
// */
//
//(function () {
//  'use strict';
//
//  describe('quizService', function () {
//
//    beforeEach(module('app'));
//
//    var quizService;
//
//    beforeEach(
//      inject(function (_quizService_) {
//        quizService = _quizService_;
//      })
//    );
//
//    it('should initialise the quiz object with a generated id and received info object', function () {
//      var mockQuizInfo = {
//        observer: {
//          firstName: 'Chen',
//          lastName: 'Guo',
//          email: 'abced@gmail.com'
//        },
//        child: {
//          firstName: 'Sam',
//          lastName: 'Fisher',
//          age: 8,
//          gender: 'Male'
//        }
//      };
//
//      quizService.initQuiz(mockQuizInfo);
//      //console.log(JSON.stringify(quizService.getQuiz()));
//
//      expect(quizService.getQuiz().id).to.match(/^\d+$/);
//      expect(quizService.getQuiz().info.observer.firstName).to.equal('Chen');
//      expect(quizService.getQuiz().info.observer.lastName).to.equal('Guo');
//      expect(quizService.getQuiz().info.observer.email).to.equal('abced@gmail.com');
//      expect(quizService.getQuiz().info.child.firstName).to.equal('Sam');
//      expect(quizService.getQuiz().info.child.lastName).to.equal('Fisher');
//      expect(quizService.getQuiz().info.child.age).to.equal(8);
//      expect(quizService.getQuiz().info.child.gender).to.equal('Male');
//    });
//
//    it('should create a folder for each quiz', function () {
//      return expect(quizService.persistQuiz()).to.be.fulfilled;
//    });
//
//
//    describe('quiz object', function () {
//
//      it('should be defined', function () {
//        expect(quizService.getQuiz()).to.exist;
//      });
//
//      it('should have an id', function () {
//        expect(quizService.getQuiz().id).to.equal('');
//      });
//
//      it('should have an info property', function () {
//        expect(quizService.getQuiz().info).to.equal('');
//      });
//    })
//
//
//  })
//}());
//
//
//
//
//
