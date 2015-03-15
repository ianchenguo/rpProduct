///**
// * Created by guochen on 13/03/15.
// */
//
//(function () {
//  'use strict';
//  //test levelService
//  describe('levelService', function(){
//    //init testing env
//    var levelService;
//    beforeEach(module('app'));
//    beforeEach(inject(function (_levelService_) {
//      levelService = _levelService_;
//    }));
//    //test getLevel()
//    describe('getLevel()', function(){
//      it('should return a level object', function(){
//
//        expect(levelService.getLevel()).to.exist;
//        expect(levelService.getLevel().constructor.name).to.equal('Level');
//      });
//    });
//    //test initLevel()
//    describe('initLevel()', function(){
//
//      var mockLevel;
//      beforeEach(function(){
//        mockLevel = {type:0};
//      })
//
//      it('should initialise the level object with data', function(){
//        levelService.initLevel(mockLevel);
//        expect(levelService.getLevel().id).to.match(/^\d+$/);
//        expect(levelService.getLevel().startTimeStamp).to.match(/^\d+$/);
//        expect(levelService.getLevel().endTimeStamp).to.be.empty;
//        expect(levelService.getLevel().type).to.equal(mockLevel.type);
//      });
//    });
//
//    describe('clearLevel()', function(){
//      it('should clear all properties of the level object', function(){
//        levelService.clearLevel();
//        expect(level.Service.getLevel().id).to.be.empty;
//        expect(level.Service.getLevel().startTimeStamp).to.be.empty;
//        expect(level.Service.getLevel().endTimeStamp).to.be.empty;
//        expect(level.Service.getLevel().type).to.be.empty;
//      })
//    })
//  });
//
//
//}());
