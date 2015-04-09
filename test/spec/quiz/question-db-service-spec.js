/**
 * Created by guochen on 11/03/15.
 */

(function () {
  'use strict';
  //tests questionDbService
  describe('questionDbService', function () {

    //prepares testing env
    var pouchDB;
    var dbService;
    var quizDbService;
    var questionDbService;
    var Quiz;
    var Question;
    var mockQuizFactory;
    var mockQuestionFactory;

    function shouldNotBeCalled(rejection) {
      //console.log(rejection);
      self.fail(rejection);
    }

    function shouldBeOK(response) {
      //console.log(response);
      expect(response.ok).toBe(true);
    }

    function putMockQuestion(mockQuestion) {
      return questionDbService
        .putQuestion(mockQuestion)
        .then(function (value) {
          //console.log(value);
        });
    }


    mockQuizFactory = {
      createQuiz: function (overwrites) {
        var now = new Date().toJSON();
        var defaults = {
          _id: 'quiz_mock_' + now + Math.random(),
          _rev: '',
          startTimeStamp: now,
          endTimeStamp: '',
          state: 'created',
          child: '',
          observer: '',
          docType: 'quiz'
        };
        var values = angular.extend(defaults, overwrites);
        return new Quiz(values);
      }
    }

    mockQuestionFactory = {
      createQuestion: function (overwrites) {

        var now = new Date().toJSON();
        var defaults = {
          _id : 'question_mock_' + now + Math.random(),
          _rev : '',
          startTimeStamp : now,
          endTimeStamp : '',
          type : 'a',
          state : 'created',
          quiz : 'quiz_mock',
          docType : 'question'
        };
        var values = angular.extend(defaults, overwrites);
        return new Question(values);
      }
    }

    beforeEach(function () {
      var $injector = angular.injector(['pouchdb', 'ng', 'core.db', 'app.quiz.localDAO', 'app.quiz.viewModel']);
      pouchDB = $injector.get('pouchDB');
      quizDbService = $injector.get('quizDbService');
      questionDbService = $injector.get('questionDbService');
      dbService = $injector.get('dbService');
      Quiz = $injector.get('Quiz');
      Question = $injector.get('Question');
    });

    beforeEach(function (done) {
      pouchDB('cedb', {adapter: 'websql'})
        .then(function (value) {
          //console.log(value);
          done();
        });
    });


    describe('putQuestion()', function () {

      it('should put a question doc in database', function (done) {
        questionDbService.putQuestion(mockQuestionFactory.createQuestion())
          .then(shouldBeOK)
          .catch(shouldNotBeCalled)
          .finally(done);
      })
    });

    //describe('listAllQuestionsOfQuiz()', function () {
    //
    //  describe('listAllQuestionsOfQuiz() in a db that has a quiz with 2 question docs', function () {
    //
    //    //populates two question docs
    //    beforeEach(function (done) {
    //
    //      var mockQuestions = [mockQuestionFactory.createQuestion()
    //        ,mockQuestionFactory.createQuestion()];
    //
    //      putMockQuestion(mockQuestions[0])
    //        .then(putMockQuestion(mockQuestions[0]))
    //        .then(done);
    //    });
    //
    //    it('should list two questions', function (done) {
    //
    //      function shouldHaveTwoRows(response) {
    //        console.log(response);
    //        //console.log(response.rows[0]);
    //        expect(response.length).toBe(2);
    //      }
    //
    //      questionDbService.listAllQuestions()
    //        .then(shouldHaveTwoRows)
    //        .catch(shouldNotBeCalled)
    //        .finally(done);
    //    });
    //  });
    //});

    describe('getQuestion()', function () {

      it('should get a question with provided id', function (done) {

        var questionRevRef;

        function shouldHaveSameRev(response) {
          //console.log(response);
          expect(response._rev).toEqual(questionRevRef);
          return response;
        }

        function shouldBeOfQuestionType(response) {
          //console.log(response);
          expect(response.docType).toEqual('question');
          return response;
        }

        questionDbService
          .putQuestion(mockQuestionFactory.createQuestion())
          .then(function (value) {
            questionRevRef = value.rev;
            return questionDbService.getQuestion(value.id);
          })
          .then(shouldBeOfQuestionType)
          .then(shouldHaveSameRev)
          .catch(shouldNotBeCalled)
          .finally(done);
      });
    });

    //describe('queryQuestionsOfSpecificQuiz()', function () {
    //
    //  describe('queryQuestionsOfSpecificQuiz() in a db that has a finished quiz ' +
    //  'and two corresponding questions', function () {
    //
    //    function putMockQuiz(mockQuestion) {
    //      return questionDbService
    //        .putQuiz(mockQuestion)
    //        .then(function (value) {
    //          //console.log(value);
    //        });
    //    }
    //
    //    var mockQuiz;
    //    var mockQuestions;
    //
    //    //puts three mock questions into database
    //    beforeEach(function (done) {
    //
    //      mockQuiz = mockQuizFactory
    //        .createQuiz({
    //          startTimeStamp: '2015-04-07T00:00:00.000Z',
    //          endTimeStamp: '2015-04-07T00:00:00.000Z',
    //          state: 'finished'
    //        });
    //
    //      mockQuestions = [
    //        mockQuestionFactory
    //          .createQuestion({
    //            startTimeStamp: '2015-04-07T00:00:00.000Z',
    //            endTimeStamp: '2015-04-07T00:00:00.000Z',
    //            state: 'finished'
    //          }),
    //        mockQuestionFactory
    //          .createQuestion({
    //            startTimeStamp: '2015-04-07T23:00:00.000Z',
    //            endTimeStamp: '2015-04-07T23:00:00.000Z',
    //            state: 'finished'
    //          }),
    //        mockQuestionFactory
    //          .createQuestion({
    //            startTimeStamp: 'a',
    //            endTimeStamp: 'a',
    //            state: 'finished'
    //          })
    //      ];
    //
    //      putMockQuiz(mockQuestions[0])
    //        .then(putMockQuiz(mockQuestions[1]))
    //        .then(putMockQuiz(mockQuestions[2]))
    //        .then(questionDbService.listAllQuestions)
    //        .catch(shouldNotBeCalled)
    //        .finally(done)
    //    });
    //
    //    it('should return two rows', function (done) {
    //
    //      function shouldHaveTwoRows(response) {
    //        //console.log(response);
    //        //console.log(response.rows);
    //        expect(response.length).toBe(2);
    //      }
    //
    //      questionDbService
    //        .queryEndedQuestionsByDate('2015-04-07T00:00:00.000Z', '2015-04-07T23:59:59.000Z')
    //        .then(shouldHaveTwoRows)
    //        .catch(shouldNotBeCalled)
    //        .finally(done);
    //    });
    //  });
    //});

    afterEach(function (done) {
      pouchDB('cedb', {adapter: 'websql'})
        .destroy()
        .then(function (value) {
          //console.log(value);
          done();
        });
    });

  });
}());
