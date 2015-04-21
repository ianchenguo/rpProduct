/**
 * Created by guochen on 11/03/15.
 */

(function () {
  'use strict';

  jasmine.DEFAULT_TIMEOUT_INTERVAL=6000;
  //tests readableLogDbService
  describe('readableLogDbService', function () {

    //prepares testing env
    var pouchDB;
    var dbService;
    var readableLogDbService;
    var ReadableLogEntry;
    var mockReadableLogEntryFactory = {
      createReadableLogEntry: function (overwrites) {
        var now = new Date().toJSON();
        var defaults = {
          _id: 'quiz_default_mock_id_readableLogEntry_mock_id',
          _rev: '',
          timeStamp: now,
          event: 'quiz start',
          detail: '',
          quiz: 'quiz_default_mock_id'
        };
        var values = angular.extend(defaults, overwrites);
        return new ReadableLogEntry(values);
      }
    };

    function shouldNotBeCalled(rejection) {
      //console.log(rejection);
      self.fail(rejection);
    }

    function shouldBeOK(response) {
      //console.log(response);
      expect(response.ok).toBe(true);
    }

    beforeEach(function () {
      var $injector = angular.injector(['pouchdb', 'ng', 'core.db', 'core.readableLog']);
      pouchDB = $injector.get('pouchDB');
      readableLogDbService = $injector.get('readableLogDbService');
      dbService = $injector.get('dbService');
      ReadableLogEntry = $injector.get('ReadableLogEntry');
    });

    beforeEach(function (done) {
      pouchDB('cedb', {adapter: 'websql'})
        .then(function (value) {
          //console.log(value);
          done();
        });
    });

    describe('putReadableLogEntry()', function () {

      it('should put a quiz doc in database', function (done) {
        readableLogDbService.putReadableLogEntry(mockReadableLogEntryFactory.createReadableLogEntry())
          .then(shouldBeOK)
          .catch(shouldNotBeCalled)
          .finally(done);
      });
    });

    describe('bulkPutReadableLogEntries()', function () {

      function shouldBeDone(response) {
        response.forEach(function(value){
          expect(value.ok).toEqual(true);
        });
      }

      it('should put multiple docs in database', function (done) {
        readableLogDbService.bulkPutReadableLogEntry(
          [mockReadableLogEntryFactory.createReadableLogEntry({_id:'quiz_mock_id_readableLogEntry_mock_id1'}),
            mockReadableLogEntryFactory.createReadableLogEntry({_id:'quiz_mock_id_readableLogEntry_mock_id2'})
        ])
          .then(shouldBeDone)
          .catch(shouldNotBeCalled)
          .finally(done);
      })
    });

    describe('listAllReadableLogEntriesOfSingleQuiz()', function () {

      describe('listAllReadableLogEntriesOfSingleQuiz() of a given quiz', function () {
        //populates two quiz docs
        var mockQuizId;
        beforeEach(function (done) {

          mockQuizId = 'quiz_mock_id';
          var mockQuizStartEntryData = {
            _id: mockQuizId+'_readableLogEntry_mock_quiz_id',
            event: 'quiz start',
            quiz: mockQuizId
          };

          var observerEntryData = {
            _id: mockQuizId+'_readableLogEntry_mock_observer_id',
            event: 'observer stored',
            quiz: mockQuizId
          };

          var childEntryData = {
            _id: mockQuizId+'_readableLogEntry_mock_child_id',
            event: 'child stored',
            quiz: mockQuizId
          };

          var mockQuestionStartEntryData = {
            _id: mockQuizId+'_readableLogEntry_mock_question_id',
            event: 'question start',
            quiz: mockQuizId
          };

          var mockLevelStartEntryData = {
            _id: mockQuizId+'_readableLogEntry_mock_level_id',
            event: 'level start',
            quiz: mockQuizId
          };

          var mockDragStartData = {
            _id: mockQuizId+'_readableLogEntry_mock_dragstart_id',
            event: 'drag start',
            quiz: mockQuizId
          };

          var mockDragSucceededEndData = {
            _id: mockQuizId+'_readableLogEntry_mock_dragend_success_id',
            event: 'succeeded drag end',
            quiz: mockQuizId
          };

          var mockAnotherDragStartData = {
            _id: mockQuizId+'_readableLogEntry_mock_dragstart_another_id',
            event: 'drag start',
            quiz: mockQuizId
          };

          var mockDragFailedEndData = {
            _id: mockQuizId+'_readableLogEntry_mock_dragend_failed_id',
            event: 'failed drag end',
            quiz: mockQuizId
          };

          var mockLevelEndEntryData = {
            _id: mockQuizId+'_readableLogEntry_mock_level_end_id',
            event: 'level end',
            quiz: mockQuizId
          };

          var mockQuestionEndEntryData = {
            _id: mockQuizId+'_readableLogEntry_mock_question_end_id',
            event: 'question end',
            quiz: mockQuizId
          };

          var mockQuizEndEntryData = {
            _id: mockQuizId+'_readableLogEntry_mock_quiz_end_id',
            event: 'quiz end',
            quiz: mockQuizId
          };


          var mockQuizStartEntry = mockReadableLogEntryFactory.createReadableLogEntry(mockQuizStartEntryData);
          var mockObserverEntry = mockReadableLogEntryFactory.createReadableLogEntry(observerEntryData);
          var mockChildEntry = mockReadableLogEntryFactory.createReadableLogEntry(childEntryData);
          var mockQuestionEntry = mockReadableLogEntryFactory.createReadableLogEntry(mockQuestionStartEntryData);
          var mockLevelStartEntry = mockReadableLogEntryFactory.createReadableLogEntry(mockLevelStartEntryData);
          var mockDragStart = mockReadableLogEntryFactory.createReadableLogEntry(mockDragStartData);
          var mockDragSucceededEnd = mockReadableLogEntryFactory.createReadableLogEntry(mockDragSucceededEndData);
          var mockAnotherDragStart = mockReadableLogEntryFactory.createReadableLogEntry(mockAnotherDragStartData);
          var mockDragFailedEnd = mockReadableLogEntryFactory.createReadableLogEntry(mockDragFailedEndData);
          var mockLevelEndEntry = mockReadableLogEntryFactory.createReadableLogEntry(mockLevelEndEntryData);
          var mockQuestionEndEntry = mockReadableLogEntryFactory.createReadableLogEntry(mockQuestionEndEntryData);
          var mockQuizEndEntry = mockReadableLogEntryFactory.createReadableLogEntry(mockQuizEndEntryData);


          dbService.db.bulkDocs([
            mockQuizStartEntry,
            mockObserverEntry,
            mockChildEntry,
            mockQuestionEntry,
            mockLevelStartEntry,
            mockDragStart,
            mockDragSucceededEnd,
            mockAnotherDragStart,
            mockDragFailedEnd,
            mockLevelEndEntry,
            mockQuestionEndEntry,
            mockQuizEndEntry
          ]).then(function (result) {
            // handle result
          }).catch(function (err) {
            console.log(err);
          }).finally(done);

        });

        it('should list 12 entries', function (done) {

          function shouldHaveTwoRows(response) {
            console.log(response);
            console.log(response[0]);
            expect(response.length).toBe(12);
          }
          readableLogDbService.listAllReadableLogEntriesOfSingleQuiz(mockQuizId)
            .then(shouldHaveTwoRows)
            .catch(shouldNotBeCalled)
            .finally(done);

          done();
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
