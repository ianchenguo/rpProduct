/**
 * Created by guochen on 13/03/15.
 */

(function () {
  'use strict';

  //tests view model Question
  describe('Question', function () {

    //prepares testing env
    var ReadableLogEntry;
    beforeEach(module('core.readableLog'));
    beforeEach(inject(function (_ReadableLogEntry_) {
      ReadableLogEntry = _ReadableLogEntry_;

    }));

    //prepares mock data
    var mockEntryData;
    beforeEach(function () {

      mockEntryData = {
        timeStamp: new Date().toJSON(),
        event:'quiz start',
        detail: 'quiz (id: mock quiz id) starts',
        quiz:'mock-quiz-id'
      }
    });

    //tests properties
    it('should have an id', function () {
      expect(new ReadableLogEntry(mockEntryData)._id).toBeDefined();
    });

    it('should have a rev', function () {
      expect(new ReadableLogEntry(mockEntryData)._rev).toBeDefined();
    });

    it('should have a time stamp', function () {
      expect(new ReadableLogEntry(mockEntryData).timeStamp).toMatch(/^\d\d\d\d-\d\d-\d\d\w\d\d:\d\d:\d\d.\d\d\d\w$/);
    });

    it('should have an event', function () {
      expect(new ReadableLogEntry(mockEntryData).event).toEqual(mockEntryData.event);
    });

    it('should have a detail', function () {
      expect(new ReadableLogEntry(mockEntryData).detail).toEqual(mockEntryData.detail);
    });

    it('should have a quiz id', function () {
      expect(new ReadableLogEntry(mockEntryData).quiz).toEqual(mockEntryData.quiz);
    });
  });
}());
