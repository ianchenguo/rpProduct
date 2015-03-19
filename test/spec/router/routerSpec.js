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

        console.log('STATE: ' + $state.current.name);
        expect($state.current.name).toEqual('app.welcome');
      });
    });

    describe('/quiz/info',function(){
      it('should change state to app.quiz.info', function(){
        goTo('/quiz/info');
        expect($state.current.name).toEqual('app.quiz.info');
      });

      it('should be able to transit to app.quiz.questions.a', function(){
      })
    });

    //describe('/quiz/questions/a', function(){
    //  it('should change state to app.quiz.questions.a',function(){
    //    goTo('/quiz/questions/a');
    //    expect($state.current.name).toEqual('app.quiz.questions.a');
    //  });
    //});

    describe('/quiz/questions/a/level0', function(){
      it('should change state to app.quiz.questions.a.level0', function(){
        goTo('/quiz/questions/a/level0');
        expect($state.current.name).toEqual('app.quiz.questions.a.level0');
      });
    });

    describe('/quiz/questions/a/level1', function(){
      it('should change state to app.quiz.questions.a.level1', function(){
        goTo('/quiz/questions/a/level1');
        expect($state.current.name).toEqual('app.quiz.questions.a.level1');
      });
    });

    describe('/quiz/questions/a/level2', function(){
      it('should change state to app.quiz.questions.a.level2', function(){
        goTo('/quiz/questions/a/level2');
        expect($state.current.name).toEqual('app.quiz.questions.a.level2');
      });
    });






    function mockTemplate(templateRoute, tmpl) {
      $templateCache.put(templateRoute, tmpl || templateRoute);
    }

    function goTo(url) {
      $location.url(url);
      $rootScope.$digest();
    }

    function goFrom(url) {
      return {
        toState: function (state, params) {
          $location.replace().url(url); //Don't actually trigger a reload
          $state.go(state, params);
          $rootScope.$digest();
        }
      };
    }

    function resolve(value) {
      return {
        forStateAndView: function (state, view) {
          var viewDefinition = view ? $state.get(state).views[view] : $state.get(state);
          return $injector.invoke(viewDefinition.resolve[value]);
        }
      };
    }


  });
}());
