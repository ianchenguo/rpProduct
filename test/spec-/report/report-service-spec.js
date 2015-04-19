/**
 * Created by guochen on 9/04/15.
 */

(function () {
  'use strict';

  describe('reportService', function () {

    var reportService;
    var ReportRecord;

    beforeEach(module('app'));

    beforeEach(inject(function (_reportService_, _ReportRecord_) {
      reportService = _reportService_;
      ReportRecord = _ReportRecord_;
    }));

    describe('createReport()', function () {
      var mockQuizDetail;

      descibie('createReport() with a quiz that has 1 question and 1 question level and 2 directives', function () {
        beforeEach(function () {

          mockQuizDetail = [

            {
              key: ['quiz_2015-04-09T10:55:41.781Z0.20343154575675726', null, null, 0],
              id: 'quiz_2015-04-09T10:55:41.781Z0.20343154575675726',
              value: null,
              doc: {
                startTimeStamp: '2015-04-09T10:55:41.781Z',
                endTimeStamp: '',
                state: 'finished',
                child: '',
                observer: '',
                docType: 'quiz',
                _id: 'quiz_2015-04-09T10:55:41.781Z0.20343154575675726',
                _rev: '1-0803bd752f5fa559c9be3b8e45a282c0'
              }
            },

            {
              key: ['quiz_2015-04-09T10:57:08.103Z0.2073969643097371', 'question_2015-04-09T10:57:08.150Z0.05254259426146746', null, 1],
              id: 'question_2015-04-09T10:57:08.150Z0.05254259426146746',
              value: null,
              doc: {
                startTimeStamp: '2015-04-09T10:57:08.150Z',
                endTimeStamp: '',
                type: 'a',
                state: 'finished',
                quiz: 'quiz_2015-04-09T10:57:08.103Z0.2073969643097371',
                docType: 'question',
                _id: 'question_2015-04-09T10:57:08.150Z0.05254259426146746',
                _rev: '1-347fc12050446c862a35185d182c7684'
              }
            },

            {
              key: ['quiz_2015-04-09T10:58:03.660Z0.6784770516678691', 'question_2015-04-09T10:58:03.684Z0.15289936447516084', 'level_2015-04-09T10:58:03.730Z0.16539160581305623', 2],
              id: 'level_2015-04-09T10:58:03.730Z0.16539160581305623',
              value: null,
              doc: {
                startTimeStamp: '2015-04-09T10:58:03.730Z',
                endTimeStamp: '',
                type: '0',
                state: 'finished',
                quiz: 'quiz_2015-04-09T10:58:03.660Z0.6784770516678691',
                question: 'question_2015-04-09T10:58:03.684Z0.15289936447516084',
                docType: 'questionLevel',
                _id: 'level_2015-04-09T10:58:03.730Z0.16539160581305623',
                _rev: '1-23566c9909413846810ada2d056b5113'
              }
            },

            {
              key: ['quiz_2015-04-09T10:59:10.393Z0.3360684956423938', 'question_2015-04-09T10:59:10.403Z0.11809521215036511', 'level_2015-04-09T10:59:10.412Z0.02533112675882876', 3],
              id: 'directive_2015-04-09T10:59:10.421Z0.2943040025420487',
              value: null,
              doc: {
                startTimeStamp: '2015-04-09T10:59:10.421Z',
                endTimeStamp: '',
                quiz: 'quiz_2015-04-09T10:59:10.393Z0.3360684956423938',
                question: 'question_2015-04-09T10:59:10.403Z0.11809521215036511',
                questionLevel: 'level_2015-04-09T10:59:10.412Z0.02533112675882876',
                state: 'finished',
                docType: 'directive',
                touches: [
                  {
                    timeStamp: '2015-04-09T11:00:21.200Z',
                    evType: 'dragstart',
                    elId: 'draggable-piece-triangle',
                    x: 200,
                    y: 200,
                    dx: 0,
                    dy: 0,
                    dt: 10,
                    success: true
                  },
                  {
                    timeStamp: '2015-04-09T11:00:22.300Z',
                    evType: 'dragend',
                    elId: 'draggable-piece-triangle',
                    x: 800,
                    y: 800,
                    dx: 0,
                    dy: 0,
                    dt: 10,
                    success: true
                  }
                ],
                _id: 'directive_2015-04-09T10:59:10.421Z0.2943040025420487',
                _rev: '1-444f266137aadb2e301af356f34ca623'
              }
            },
            {
              key: ['quiz_2015-04-09T11:00:22.309Z0.30876434361562133', 'question_2015-04-09T11:00:22.343Z0.3844197883736342', 'level_2015-04-09T11:00:22.387Z0.7022409543860704', 3],
              id: 'directive_2015-04-09T11:00:22.496Z0.5222178208641708',
              value: null,
              doc: {
                startTimeStamp: '2015-04-09T11:00:22.496Z',
                endTimeStamp: '',
                quiz: 'quiz_2015-04-09T11:00:22.309Z0.30876434361562133',
                question: 'question_2015-04-09T11:00:22.343Z0.3844197883736342',
                questionLevel: 'level_2015-04-09T11:00:22.387Z0.7022409543860704',
                state: 'finished',
                docType: 'directive',
                touches: [
                  {
                    timeStamp: '2015-04-09T11:00:22.498Z',
                    evType: 'dragstart',
                    elId: 'draggable-piece-circle',
                    x: 1000,
                    y: 1000,
                    dx: 0,
                    dy: 0,
                    dt: 10,
                    success: true
                  },
                  {
                    timeStamp: '2015-04-09T11:00:22.555Z',
                    evType: 'dragend',
                    elId: 'draggable-piece-circle',
                    x: 1010,
                    y: 1010,
                    dx: 0,
                    dy: 0,
                    dt: 10,
                    success: false
                  }
                ],
                _id: 'directive_2015-04-09T11:00:22.496Z0.5222178208641708',
                _rev: '1-943a09f238acd45557be8f8fcf3e3aed'
              }
            }
          ];
        });

        it('should extract quiz start record', function () {
          var report = reportService.createReport(mockQuizDetail);

          expect(report[0].subject).toEqual('quiz');
          expect(report[0].detail).toEqual('quiz start');
        });

        it('should extract quiz end record', function () {
          var report = reportService.createReport(mockQuizDetail);

          expect(report[report.length - 1].subject).toEqual('quiz');
          expect(report[report.length - 1].detail).toEqual('quiz end');
        });

        it('should extract question start record', function () {
          var report = reportService.createReport(mockQuizDetail);

          expect(report[1].subject).toEqual('question-a');
          expect(report[1].detail).toEqual('question-a start');
        });

        it('should extract question end record', function () {
          var report = reportService.createReport(mockQuizDetail);

          expect(report[report.length - 2].subject).toEqual('question-a');
          expect(report[report.length - 2].detail).toEqual('question-a end');
        });

        it('should extract question level start record', function () {
          var report = reportService.createReport(mockQuizDetail);

          expect(report[2].subject).toEqual('questionLevel-0');
          expect(report[2].detail).toEqual('questionLevel-0 start');
        });

        it('should extract question level end record', function () {
          var report = reportService.createReport(mockQuizDetail);

          expect(report[report.length - 3].subject).toEqual('questionLevel-0');
          expect(report[report.length - 3].detail).toEqual('questionLevel-0 end');
        });

        it('should extract directive start drag record', function () {
          var report = reportService.createReport(mockQuizDetail);

          expect(report[3].subject).toEqual('draggable-piece-triangle');
          expect(report[3].detail).toEqual('dragstart on draggable-piece-triangle at x: 200 y: 200');
        });

        it('should extract directive start drag record', function () {
          var report = reportService.createReport(mockQuizDetail);

          expect(report[4].subject).toEqual('draggable-piece-triangle');
          expect(report[4].detail).toEqual('dragend on draggable-piece-triangle at x: 800 y: 800');
        });

        it('should extract directive rollback drag record', function () {
          var report = reportService.createReport(mockQuizDetail);

          expect(report[7].subject).toEqual('draggable-piece-circle');
          expect(report[7].detail).toEqual('rollback on draggable-piece-circle at x: 1000 y: 1000');
        });
      });

      //describe('createReport() with a quiz that has 2 questions and 2 question levels for each question ' +
      //'and 2 directives for each level', function () {
      //
      //});

    });


  });


}
()
)
;
