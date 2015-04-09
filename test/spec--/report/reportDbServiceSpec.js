///**
// * Created by guochen on 7/04/15.
// */
//
//(function () {
//  'use strict';
//
//  describe('reportDbService', function() {
//
//
//
//    var $rootScope,
//      reportDbService;
//
//    beforeEach(module('app'));
//
//    beforeEach(inject(function(_$rootScope_,_reportDbService_) {
//      $rootScope = _$rootScope_;
//      reportDbService = _reportDbService_;
//    }));
//
//
//    function shouldBeOk(value) {
//      console.log(value);
//      return value;
//    }
//
//    function shouldNotBeExecuted(error) {
//      console.log(error);
//      return error;
//    }
//
//    describe('queryQuizzes', function() {
//
//      it('should retrieve quizzes finished between a date range', function() {
//
//        var startDate = new Date('December 17, 2014 00:00:00');
//        reportDbService.queryQuizzes(startDate, endDate)
//          .then(shouldBeOk)
//          .catch(shouldNotBeExecuted);
//
//        $rootScope.$apply();
//      });
//
//
//    })
//  });
//
//
//
//
//}());
