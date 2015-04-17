/**
* Created by guochen on 12/03/15.
*/

(function () {
  'use strict';

  describe('path', function () {

    var $templateCache,$location,$rootScope,$state;

    //initialise with AngularJS injections
    beforeEach(module('app'));

    beforeEach(inject(function(_$templateCache_,_$location_,_$rootScope_,_$state_) {
      $templateCache = _$templateCache_;
      $location = _$location_;
      $rootScope = _$rootScope_;
      $state = _$state_;
    }));

    beforeEach(function(){
      $templateCache.put('scripts/webComponents/questionA/questionA.html','');
      $templateCache.put('scripts/webComponents/quizInfo/quizInfo.html','');
      $templateCache.put('scripts/webComponents/welcome/welcome.html','');
      $templateCache.put('scripts/webComponents/sideMenu/sideMenu.html','');

    });


    describe('/welcome', function () {
      it('should change state to app.welcome', function () {
        goTo('/welcome');
        //console.log('STATE: ' + $state.current.name);
        expect($state.current.name).toEqual('app.welcome');
      });
    });

    describe('/quizInfo',function(){
      it('should change state to app.quizInfo', function(){
        goTo('/quizInfo');
        expect($state.current.name).toEqual('app.quizInfo');
      });
    });

    //describe('/quiz/questionA/levels/0', function(){
    //  it('should change state to app.quiz.questionA.levels.0', function(){
    //    goTo('/quiz/questionA/levels/0');
    //    expect($state.current.name).toEqual('app.quiz.questionA.levels.0');
    //  });
    //});
    //
    //describe('/quiz/questionA/levels/1', function(){
    //  it('should change state to app.quiz.questionA.levels.1', function(){
    //    goTo('/quiz/questionA/levels/1');
    //    expect($state.current.name).toEqual('app.quiz.questionA.levels.1');
    //  });
    //});
    //
    //describe('/quiz/questionA/levels/2', function(){
    //  it('should change state to app.quiz.questionA.levels.2', function(){
    //    goTo('/quiz/questionA/levels/2');
    //    expect($state.current.name).toEqual('app.quiz.questionA.levels.2');
    //  });
    //});

    //function mockTemplate(templateRoute, tmpl) {
    //  $templateCache.put(templateRoute, tmpl || templateRoute);
    //}

    function goTo(url) {
      $location.url(url);
      $rootScope.$digest();
    }

    //function goFrom(url) {
    //  return {
    //    toState: function (state, params) {
    //      $location.replace().url(url); //Don't actually trigger a reload
    //      $state.go(state, params);
    //      $rootScope.$digest();
    //    }
    //  };
    //}
    //
    //function resolve(value) {
    //  return {
    //    forStateAndView: function (state, view) {
    //      var viewDefinition = view ? $state.get(state).views[view] : $state.get(state);
    //      return $injector.invoke(viewDefinition.resolve[value]);
    //    }
    //  };
    //}
  });
}());
