/*
 * CONTROLLERS
 */

'use strict';

angular.module('myApp.controllers', [])
  .controller('MainCtrl', function ($scope) {
    
  })

  //POSTS
  .controller('TodosIndexCtrl', function ($scope) {
    $scope.todos = [
        {id:1, title:"laundry"}
      , {id:2, title:"laundry"}
      , {id:3, title:"laundry"}
      , {id:4, title:"laundry"}
      , {id:5, title:"laundry"}
    ]
    
  });