/**
 * Created by guochen on 11/03/15.
 */

(function () {
  'use strict';

  //tests directiveDbService
  describe('directiveDbService', function () {

    //prepares testing env
    var directiveDbService, Directive, STATE, QUESTION_TYPE, dbService;

    beforeEach(function () {

      var $injector = angular.injector(['ui.router', 'pouchdb', 'ng', 'core.db', 'app.quiz']);
      directiveDbService = $injector.get('directiveDbService');
      Directive = $injector.get('Directive');
      STATE = $injector.get('STATE');
      QUESTION_TYPE = $injector.get('QUESTION_TYPE');
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
    var mockDirective;
    beforeEach(function () {
      mockDirective = new Directive(
        {
          endTimeStamp:'',
          touches:[],
          quiz:'quiz_dummy_id'
        }
      )
    });

    function shouldNotBeCalled(rejection) {
      console.log(rejection);
      self.fail(rejection);
    }

    function shouldBeOK(response) {
      expect(response.ok).toBe(true);
    }

    //tests putDirective()
    describe('putDirective()', function () {

      it('should put a directive document in database', function (done) {

        directiveDbService.putDirective(mockDirective)
          .then(shouldBeOK)
          .catch(shouldNotBeCalled)
          .finally(done);
      });
    });

    //tests getDirective()
    describe('getDirective()', function () {

      function getDirectiveById(value) {
        return directiveDbService.getDirective(value.id);
      }

      function shouldGetTheRightDirective(directive) {
        expect(directive._id).toBe(mockDirective._id);
      }

      it('should get a directive document from database with provided id', function (done) {

        directiveDbService.putDirective(mockDirective)
          .then(getDirectiveById)
          .then(shouldGetTheRightDirective)
          .catch(shouldNotBeCalled)
          .finally(done);
      });
    });
  });
}());
