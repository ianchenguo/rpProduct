/**
 * Created by guochen on 23/03/15.
 */

(function () {
  'use strict';

  describe('readableLogService', function () {

    var readableLogService;
    var ReadableLogEntry;
    var READABLE_LOG_EVENTS;
    var READABLE_LOG_DETAIL_SUBJECT;
    var READABLE_LOG_DETAIL_PREP;
    beforeEach(module('core.readableLog'));

    beforeEach(inject(function (_readableLogService_,
                                _ReadableLogEntry_,
                                _READABLE_LOG_EVENTS_,
                                _READABLE_LOG_DETAIL_SUBJECT_,
                                _READABLE_LOG_DETAIL_PREP_) {

      readableLogService = _readableLogService_;
      ReadableLogEntry = _ReadableLogEntry_;
      READABLE_LOG_EVENTS = _READABLE_LOG_EVENTS_;
      READABLE_LOG_DETAIL_SUBJECT = _READABLE_LOG_DETAIL_SUBJECT_;
      READABLE_LOG_DETAIL_PREP = _READABLE_LOG_DETAIL_PREP_;
    }));

    var mockQuizStartData;
    var mockQuizEndData;
    var mockQuestionStartData;
    var mockQuestionEndData;
    var mockLevelStartData;
    var mockLevelEndData;

    beforeEach(function () {
      mockQuizStartData = {
        _id: 'mock_quiz_start_id',
        startTimeStamp: new Date().toJSON(),
        endTimeStamp: '',
        observer: {
          firstName: 'Sam',
          lastName: 'Fisher',
          email: 'sam.fisher@gmail.com'
        },
        child: {
          firstName: 'Solid',
          lastName: 'Snake',
          age: 12,
          gender: 'male'
        }
      };

      mockQuizEndData = {
        _id: 'mock_quiz_end_id',
        endTimeStamp: new Date().toJSON()
      };

      mockQuestionStartData = {
        _id: 'mock_question_start_id',
        startTimeStamp: new Date().toJSON(),
        endTimeStamp: ''
      };

      mockQuestionEndData = {
        _id: 'mock_question_start_id',
        startTimeStamp: new Date().toJSON(),
        endTimeStamp: new Date().toJSON()
      };

      mockLevelStartData = {
        _id: 'mock_level_start_id',
        startTimeStamp: new Date().toJSON(),
        endTimeStamp: ''
      };

      mockLevelEndData = {
        _id: 'mock_level_start_id',
        startTimeStamp: new Date().toJSON(),
        endTimeStamp: new Date().toJSON()
      };
    });

    describe('createQuizLog()', function () {
      it('should create a quiz start entry when a quiz is created', function () {

        var targetEntry = new ReadableLogEntry(
          {
            timeStamp: mockQuizStartData.startTimeStamp,
            event: READABLE_LOG_EVENTS.quizStart,
            detail: READABLE_LOG_DETAIL_SUBJECT.quiz + ' ' + mockQuizStartData._id
          }
        );

        var createdEntry = readableLogService.createQuizLog(mockQuizStartData);
        expect(createdEntry.timeStamp).toEqual(targetEntry.timeStamp);
        expect(createdEntry.event).toEqual(targetEntry.event);
        expect(createdEntry.detail).toEqual(targetEntry.detail);
      });

      it('should create a quiz end entry when a quiz is ended', function () {

        var targetEntry = new ReadableLogEntry(
          {
            timeStamp: mockQuizEndData.endTimeStamp,
            event: READABLE_LOG_EVENTS.quizEnd,
            detail: READABLE_LOG_DETAIL_SUBJECT.quiz + ' ' + mockQuizEndData._id
          }
        );

        var createdEntry = readableLogService.createQuizLog(mockQuizEndData);
        expect(createdEntry.timeStamp).toEqual(targetEntry.timeStamp);
        expect(createdEntry.event).toEqual(targetEntry.event);
        expect(createdEntry.detail).toEqual(targetEntry.detail);
      });
    });

    describe('createObserverLog()', function () {

      it('should create an observer entry', function () {

        var targetEntry = new ReadableLogEntry(
          {
            timeStamp: mockQuizStartData.startTimeStamp,
            event: READABLE_LOG_EVENTS.observerInfoStored,
            detail: mockQuizStartData.observer.firstName + ' ' +
            mockQuizStartData.observer.lastName + ' ' +
            mockQuizStartData.observer.email
          });

        var createdEntry = readableLogService.createObserverLog(mockQuizStartData);

        expect(createdEntry.timeStamp).toEqual(targetEntry.timeStamp);
        expect(createdEntry.event).toEqual(targetEntry.event);
        expect(createdEntry.detail).toEqual(targetEntry.detail);
      });
    });

    describe('createChildLog()', function () {

      it('should create an child entry', function () {

        var targetEntry = new ReadableLogEntry(
          {
            timeStamp: mockQuizStartData.startTimeStamp,
            event: READABLE_LOG_EVENTS.childInfoStored,
            detail: mockQuizStartData.child.firstName + ' ' +
            mockQuizStartData.child.lastName + ' ' +
            mockQuizStartData.child.age + ' ' +
            mockQuizStartData.child.gender

          });

        var createdEntry = readableLogService.createChildLog(mockQuizStartData);

        expect(createdEntry.timeStamp).toEqual(targetEntry.timeStamp);
        expect(createdEntry.event).toEqual(targetEntry.event);
        expect(createdEntry.detail).toEqual(targetEntry.detail);
      });
    });

    describe('createQuestionLog()', function () {
      it('should create a question start entry when a question is created', function () {

        var targetEntry = new ReadableLogEntry(
          {
            timeStamp: mockQuestionStartData.startTimeStamp,
            event: READABLE_LOG_EVENTS.questionStart,
            detail: READABLE_LOG_DETAIL_SUBJECT.question + ' ' + mockQuestionStartData._id
          }
        );

        var createdEntry = readableLogService.createQuestionLog(mockQuestionStartData);
        expect(createdEntry.timeStamp).toEqual(targetEntry.timeStamp);
        expect(createdEntry.event).toEqual(targetEntry.event);
        expect(createdEntry.detail).toEqual(targetEntry.detail);
      });

      it('should create a question end entry when a question is ended', function () {

        var targetEntry = new ReadableLogEntry(
          {
            timeStamp: mockQuestionEndData.endTimeStamp,
            event: READABLE_LOG_EVENTS.questionEnd,
            detail: READABLE_LOG_DETAIL_SUBJECT.question + ' ' + mockQuestionEndData._id
          }
        );

        var createdEntry = readableLogService.createQuestionLog(mockQuestionEndData);
        expect(createdEntry.timeStamp).toEqual(targetEntry.timeStamp);
        expect(createdEntry.event).toEqual(targetEntry.event);
        expect(createdEntry.detail).toEqual(targetEntry.detail);
      });
    });

    describe('createLevelLog()', function () {
      it('should create a level start entry when a level is created', function () {

        var targetEntry = new ReadableLogEntry(
          {
            timeStamp: mockLevelStartData.startTimeStamp,
            event: READABLE_LOG_EVENTS.levelStart,
            detail: READABLE_LOG_DETAIL_SUBJECT.level + ' ' + mockLevelStartData._id
          }
        );

        var createdEntry = readableLogService.createLevelLog(mockLevelStartData);
        expect(createdEntry.timeStamp).toEqual(targetEntry.timeStamp);
        expect(createdEntry.event).toEqual(targetEntry.event);
        expect(createdEntry.detail).toEqual(targetEntry.detail);
      });

      it('should create a level end entry when a level is ended', function () {

        var targetEntry = new ReadableLogEntry(
          {
            timeStamp: mockLevelEndData.endTimeStamp,
            event: READABLE_LOG_EVENTS.levelEnd,
            detail: READABLE_LOG_DETAIL_SUBJECT.level + ' ' + mockLevelEndData._id
          }
        );

        var createdEntry = readableLogService.createLevelLog(mockLevelEndData);
        expect(createdEntry.timeStamp).toEqual(targetEntry.timeStamp);
        expect(createdEntry.event).toEqual(targetEntry.event);
        expect(createdEntry.detail).toEqual(targetEntry.detail);
      });
    });

    describe('createDragLog()', function () {

      var mockDragStartData;

      beforeEach(function () {
        mockDragStartData = {
          timeStamp: new Date().toJSON(),
          elId: 'mock_start_element',
          evType: 'dragstart',
          fromParent: 'mock_start_from_parent'
        };
      });

      describe('createDragLog() when a drag start', function () {

        it('should create a drag start entry', function () {

          var targetEntry = new ReadableLogEntry(
            {
              timeStamp: mockDragStartData.timeStamp,
              event: READABLE_LOG_EVENTS.dragStart,
              detail: READABLE_LOG_DETAIL_SUBJECT.drag + ' ' +
              mockDragStartData.elId + ' ' +
              READABLE_LOG_DETAIL_PREP.dragStart + ' ' +
              mockDragStartData.fromParent
            }
          );

          //console.log(targetEntry.detail);
          var createdEntry = readableLogService.createDragLog(mockDragStartData);
          expect(createdEntry.timeStamp).toEqual(targetEntry.timeStamp);
          expect(createdEntry.event).toEqual(targetEntry.event);
          expect(createdEntry.detail).toEqual(targetEntry.detail);
        });
      });

      describe('createDragLog() when a drag successfully ended', function () {
        it('should create a succeeded drag end entry', function () {

          var mockDragSucceededEndData = {
            timeStamp: new Date().toJSON(),
            elId: 'mock_succeeded_end_element',
            evType: 'dragend',
            toParent: 'mock_succeeded_end_parent',
            isSucceeded: true
          };

          var targetEntry = new ReadableLogEntry(
            {
              timeStamp: mockDragSucceededEndData.timeStamp,
              event: READABLE_LOG_EVENTS.dragEndSuccess,
              detail: READABLE_LOG_DETAIL_SUBJECT.drag + ' ' +
              mockDragSucceededEndData.elId + ' ' +
              READABLE_LOG_DETAIL_PREP.dragEnd + ' ' +
              mockDragSucceededEndData.toParent
            }
          );

          //console.log(targetEntry.detail);
          var createdEntry = readableLogService.createDragLog(mockDragSucceededEndData);
          expect(createdEntry.timeStamp).toEqual(targetEntry.timeStamp);
          expect(createdEntry.event).toEqual(targetEntry.event);
          expect(createdEntry.detail).toEqual(targetEntry.detail);
        });
      });

      describe('createDragLog() when a drag ended in failure', function () {
        it('should create a failed drag end entry', function () {

          var mockDragFailedEndData = {
            timeStamp: new Date().toJSON(),
            elId: 'mock_failed_end_element',
            evType: 'dragend',
            toParent: 'mock_failed_end_parent',
            isSucceeded: false
          };

          var targetEntry = new ReadableLogEntry(
            {
              timeStamp: mockDragFailedEndData.timeStamp,
              event: READABLE_LOG_EVENTS.dragEndFailed,
              detail: READABLE_LOG_DETAIL_SUBJECT.drag + ' ' +
              mockDragFailedEndData.elId + ' ' +
              READABLE_LOG_DETAIL_PREP.dragEnd + ' ' +
              mockDragFailedEndData.toParent + ' ' +
              READABLE_LOG_DETAIL_PREP.dragFailed + ' ' +
              mockDragStartData.fromParent

            }
          );

          console.log(targetEntry.detail);
          readableLogService.createDragLog(mockDragStartData);
          var createdEntry = readableLogService.createDragLog(mockDragFailedEndData);
          expect(createdEntry.timeStamp).toEqual(targetEntry.timeStamp);
          expect(createdEntry.event).toEqual(targetEntry.event);
          expect(createdEntry.detail).toEqual(targetEntry.detail);
        });
      });
    });

  });
}());

