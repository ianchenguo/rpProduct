/**
 * Created by guochen on 11/03/15.
 */

(function () {
  'use strict';
  //tests questionDbService
  describe('questionDbService', function () {

    //prepares testing env
    var now;
    var pouchDB;
    var dbService;
    var quizDbService;
    var questionDbService;
    var questionLevelDbService;
    var directiveDbService;
    var reportDbService;
    var Quiz;
    var Question;
    var QuestionLevel;
    var Directive;
    var mockQuizFactory;
    var mockQuestionFactory;
    var mockQuestionLevelFactory;
    var mockDirectiveFactory;
    var currentQuizId;
    var currentQuestionId;
    var currentQuestionLevelId;
    var currentDirectiveId;
    var expectedRows;

    function shouldNotBeCalled(rejection) {
      //console.log(rejection);
      self.fail(rejection);
    }

    function shouldBeOK(response) {
      //console.log(response);
      expect(response.ok).toBe(true);
    }

    now = new Date().toJSON();

    mockQuizFactory = {
      createQuiz: function (overwrites) {
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
    };

    mockQuestionFactory = {
      createQuestion: function (overwrites) {

        var defaults = {
          _id: 'question_mock_' + now + Math.random(),
          _rev: '',
          startTimeStamp: now,
          endTimeStamp: '',
          type: 'a',
          state: 'created',
          quiz: 'quiz_mock',
          docType: 'question'
        };
        var values = angular.extend(defaults, overwrites);
        return new Question(values);
      }
    };

    mockQuestionLevelFactory = {
      createQuestionLevel: function (overwrites) {
        var defaults = {
          _id: 'level_mock_' + now + Math.random(),
          _rev: '',
          startTimeStamp: now,
          endTimeStamp: '',
          type: '0',
          state: 'created',
          quiz: 'quiz_mock',
          question: 'question_mock',
          docType: 'questionLevel'
        }

        var values = angular.extend(defaults, overwrites);
        return new QuestionLevel(values);
      }
    };

    mockDirectiveFactory = {
      createQuestionLevel: function (overwrites) {
        var defaults = {
          _id: 'directive_' + now + Math.random(),
          _rev: '',
          startTimeStamp: now,
          endTimeStamp: '',
          touches: [],
          quiz: 'quiz_mock',
          question: 'question_mock',
          questionLevel: 'level_mock',
          state: 'created',
          docType: 'directive'
        }

        var values = angular.extend(defaults, overwrites);
        return new Directive(values);
      }
    };

    beforeEach(function () {
      var $injector = angular.injector(['pouchdb', 'ng', 'core.db', 'app.report.localDAO', 'app.quiz.localDAO', 'app.quiz.viewModel']);
      pouchDB = $injector.get('pouchDB');
      quizDbService = $injector.get('quizDbService');
      questionDbService = $injector.get('questionDbService');
      questionLevelDbService = $injector.get('questionLevelDbService');
      directiveDbService = $injector.get('directiveDbService');
      reportDbService = $injector.get('reportDbService');
      dbService = $injector.get('dbService');
      Quiz = $injector.get('Quiz');
      Question = $injector.get('Question');
      QuestionLevel = $injector.get('QuestionLevel');
      Directive = $injector.get('Directive');
    });

    beforeEach(function (done) {
      pouchDB('cedb', {adapter: 'websql'})
        .then(function (value) {
          //console.log(value);
          done();
        });
    });

    beforeEach(function (done) {

      var mockQuiz;
      var mockQuestion;
      var mockQuestionLevel;
      var mockDirective;

      function putMockQuiz() {
        mockQuiz = mockQuizFactory.createQuiz({state: 'finished'});

        return quizDbService
          .putQuiz(mockQuiz)
          .then(function (value) {
            //console.log(value);
            currentQuizId = value.id;
          });
      }

      function putMockQuestion() {
        mockQuestion = mockQuestionFactory.createQuestion({
          state: 'finished',
          quiz: currentQuizId
        });

        return questionDbService
          .putQuestion(mockQuestion)
          .then(function (value) {
            //console.log(value);
            currentQuestionId = value.id;
          });
      }


      function putMockQuestionLevel() {
        mockQuestionLevel = mockQuestionLevelFactory.createQuestionLevel({
          state: 'finished',
          quiz: currentQuizId,
          question: currentQuestionId
        });

        return questionLevelDbService
          .putQuestionLevel(mockQuestionLevel)
          .then(function (value) {
            //console.log(value);
            currentQuestionLevelId = value.id;
          });
      }

      function putMockDirective() {
        mockDirective = mockDirectiveFactory.createQuestionLevel({
          state: 'finished',
          quiz: currentQuizId,
          question: currentQuestionId,
          questionLevel: currentQuestionLevelId
        });

        return directiveDbService
          .putDirective(mockDirective)
          .then(function (value) {
            //console.log(value);
            currentDirectiveId = value.id;
          });
      }

      //puts 8 docs into db
      putMockQuiz()
        .then(putMockQuiz)
        .then(putMockQuestion)
        .then(putMockQuestionLevel)
        .then(putMockDirective)
        .then(putMockDirective)
        .then(putMockDirective)
        .then(putMockDirective)
        .then(function(){
          expectedRows = 7;
        })
        .finally(done);

    });

    describe('getQuizDetailById()', function () {
      it('should list detail a quiz', function (done) {

        function shouldReturnSixRows(value) {
          //console.log(value);
          //console.log(value.rows);
          //for (var i=0;i< value.length;i++) {
          //  console.log(value[i]);
          //}

          expect(value.length).toEqual(expectedRows);
          return value;
        }

        reportDbService
          .getQuizDetailById(currentQuizId)
          .then(shouldReturnSixRows)
          .catch(shouldNotBeCalled)
          .finally(done);
      });
    });


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
