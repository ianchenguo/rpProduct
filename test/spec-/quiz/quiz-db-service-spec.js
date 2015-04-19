/**
 * Created by guochen on 11/03/15.
 */

(function () {
  'use strict';
  //tests quizDbService
  describe('quizDbService', function () {

    //prepares testing env
    var pouchDB,
      dbService,
      quizDbService,
      Quiz,
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

    function shouldNotBeCalled(rejection) {
      //console.log(rejection);
      self.fail(rejection);
    }

    function shouldBeOK(response) {
      //console.log(response);
      expect(response.ok).toBe(true);
    }

    beforeEach(function () {
      var $injector = angular.injector(['pouchdb', 'ng', 'core.db', 'app.quiz.localDAO', 'app.quiz.viewModel']);
      pouchDB = $injector.get('pouchDB');
      quizDbService = $injector.get('quizDbService');
      dbService = $injector.get('dbService');
      Quiz = $injector.get('Quiz');
    });

    beforeEach(function (done) {
      pouchDB('cedb', {adapter: 'websql'})
        .then(function (value) {
          //console.log(value);
          done();
        });
    });

    describe('putQuiz()', function () {

      it('should put a quiz doc in database', function (done) {
        quizDbService.putQuiz(mockQuizFactory.createQuiz())
          .then(shouldBeOK)
          .catch(shouldNotBeCalled)
          .finally(done);
      })
    });

    describe('listAllQuizzes()', function () {

      describe('listAllQuizzes() in a db that has 2 quiz docs', function () {
        //populates two quiz docs
        beforeEach(function (done) {
          quizDbService
            .putQuiz(mockQuizFactory.createQuiz())
            .then(function () {
              return quizDbService.putQuiz(mockQuizFactory.createQuiz());
            })
            .then(done);
        });

        it('should list two quizzes', function (done) {

          function shouldHaveTwoRows(response) {
            //console.log(response);
            //console.log(response.rows[0]);
            expect(response.length).toBe(2);
          }

          quizDbService.listAllQuizzes()
            .then(shouldHaveTwoRows)
            .catch(shouldNotBeCalled)
            .finally(done);
        });
      });
    });


    describe('getQuiz()', function () {

      it('should get a quiz with provided id', function (done) {

        var quizRevRef;

        function shouldHaveSameRev(response) {
          //console.log(response);
          expect(response._rev).toEqual(quizRevRef);
        }

        quizDbService
          .putQuiz(mockQuizFactory.createQuiz())
          .then(function (value) {
            quizRevRef = value.rev;
            return quizDbService.getQuiz(value.id);
          })
          .then(shouldHaveSameRev)
          .catch(shouldNotBeCalled)
          .finally(done);
      });
    });

    describe('queryEndedQuizzesByDate()', function () {

      describe('queryEndedQuizzesByDate() in a db that has 2 quizzes finished today', function () {


        function putMockQuiz(mockQuiz) {
          return quizDbService
            .putQuiz(mockQuiz)
            .then(function (value) {
              //console.log(value);
            });
        }

        var mockQuizzes;

        //puts three mock quizzes into database
        beforeEach(function (done) {

          mockQuizzes = [
            mockQuizFactory
              .createQuiz({
                startTimeStamp: '2015-04-07T00:00:00.000Z',
                endTimeStamp: '2015-04-07T00:00:00.000Z',
                state: 'finished'
              }),
            mockQuizFactory
              .createQuiz({
                startTimeStamp: '2015-04-07T23:00:00.000Z',
                endTimeStamp: '2015-04-07T23:00:00.000Z',
                state: 'finished'
              }),
            mockQuizFactory
              .createQuiz({
                startTimeStamp: 'a',
                endTimeStamp: 'a',
                state: 'finished'
              })
          ];

          putMockQuiz(mockQuizzes[0])
            .then(putMockQuiz(mockQuizzes[1]))
            .then(putMockQuiz(mockQuizzes[2]))
            .then(quizDbService.listAllQuizzes)
            .catch(shouldNotBeCalled)
            .finally(done)
        });

        it('should return two rows', function (done) {

          function shouldHaveTwoRows(response) {
            //console.log(response);
            //console.log(response.rows);
            expect(response.length).toBe(2);
          }

          quizDbService
            .queryEndedQuizzesByDate('2015-04-07T00:00:00.000Z', '2015-04-07T23:59:59.000Z')
            .then(shouldHaveTwoRows)
            .catch(shouldNotBeCalled)
            .finally(done);
        });
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
