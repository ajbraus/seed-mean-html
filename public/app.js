/*
 * ANGULAR APP.JS
 */

'use strict';

angular.module('myApp', ['ui.router',
                         'ngResource',
                         'myApp.services',
                         'myApp.controllers'])

  .constant('HOST', 'http://localhost:1337') //DEV
  // .constant('HOST', 'http://yourdomain.herokuapp.com') //PRODUCTION

  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state('todos', {
        url: "/",
        templateUrl: 'templates/todos-index',
        controller: 'TodosIndexCtrl'
      });

    $urlRouterProvider.otherwise("/state1");

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
  }]);
