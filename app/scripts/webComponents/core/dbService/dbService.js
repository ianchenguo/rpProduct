/**
 * Created by guochen on 15/03/15.
 */

(function () {
  'use strict';
  angular
    .module('core.dbService')
    .factory('dbService', dbService);

  dbService.$inject = ['pouchDB']
  function dbService(pouchDB) {

    PouchDB.debug.disable();
    //PouchDB.debug.enable('*');

    var db = pouchDB('cedb', {adapter: 'websql'});

    db.setSchema([
      {
        singular: 'quiz',
        plural: 'quizzes',
        relations: {
          questions: {hasMany: 'question'},
          child: {belongsTo: 'child'},
          observer: {belongsTo: 'observer'},
          device: {belongsTo: 'device'}
        }
      },
      {
        singular: 'child',
        plural: 'children',
        relations: {
          quiz: {belongsTo: 'quiz'}
        }
      },
      {
        singular: 'observer',
        plural: 'observers',
        relations: {
          quiz: {belongsTo: 'quiz'}
        }
      },
      {
        singular: 'device',
        plural: 'devices',
        relations: {
          quiz: {belongsTo: 'quiz'}
        }
      },
      {
        singular: 'question',
        plural: 'questions',
        relations: {
          quiz: {belongsTo: 'quiz'}
        }
      },
      {
        singular: 'questionLevel',
        plural: 'questionLevels',
        relations: {
          question: {belongsTo: 'question'},
          directives: {hasMany: 'directives'}
        }
      },
      {
        singular: 'directive',
        plural: 'directives',
        relations: {
          questionLevel: {belongsTo: 'questionLevel'}
        }
      }
    ]);

    var service = {
      db: db
    };

    return service;
  }

}());
