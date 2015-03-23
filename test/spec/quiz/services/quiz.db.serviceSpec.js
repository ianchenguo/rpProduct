/**
 * Created by guochen on 11/03/15.
 */

(function () {
  'use strict';
  //tests quizDbService
  describe('quizDbService', function () {

    //prepares testing env
    var dbService, quizDbService, Quiz;

    beforeEach(function () {

      var $injector = angular.injector(['ui.router', 'pouchdb', 'ng', 'core.db', 'app.quiz']);
      quizDbService = $injector.get('quizDbService');
      Quiz = $injector.get('Quiz');
      dbService = $injector.get('dbService');

    });

    beforeEach(function(done){
      dbService.deleteDB()
        .then(function(){
          return dbService.createDB();
        })
        .finally(done);
    })

    //prepares mock data
    var mockQuiz;
    beforeEach(function () {
      mockQuiz = new Quiz();
    });

    function shouldNotBeCalled(rejection) {
      console.log(rejection);
      self.fail(rejection);
    }

    function shouldBeOK(response) {
      expect(response.ok).toBe(true);
    }

    //tests putQuiz()
    describe('putQuiz()', function () {

      it('should put a quiz document in database', function (done) {

        quizDbService.putQuiz(mockQuiz)
          .then(shouldBeOK)
          .catch(shouldNotBeCalled)
          .finally(done);
      });
    });

    //tests getQuiz()
    describe('getQuiz()', function () {

      function getQuizById(value) {
        return quizDbService.getQuiz(value.id);
      }

      function shouldGetTheRightQuiz(quiz) {
        expect(quiz._id).toBe(mockQuiz._id);
      }

      it('should get a quiz document from database with provided id', function (done) {

        quizDbService.putQuiz(mockQuiz)
          .then(getQuizById)
          .then(shouldGetTheRightQuiz)
          .catch(shouldNotBeCalled)
          .finally(done);
      });
    });

    //tests listQuizzes()
    describe('listQuizzes()',function(){

      beforeEach(function(done){
        quizDbService.putQuiz(mockQuiz).
          then(quizDbService.putQuiz(mockQuiz)).
          then(quizDbService.putQuiz(mockQuiz)).
          finally(done);
      });


      it('should list all quiz documents in database', function (done) {
        quizDbService.listQuizzes()
          .then(shouldGetQuizzes)
          .catch(shouldNotBeCalled)
          .finally(done);

        function shouldGetQuizzes(response){
          expect(response.total_rows).toBeGreaterThan(0);
        }
      });
    });

  });
}());
