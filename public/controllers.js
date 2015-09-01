/*
 * CONTROLLERS
 */

'use strict';

angular.module('myApp.controllers', [])
  .controller('MainCtrl', ['$rootScope', '$scope', '$location', 'Auth', function ($rootScope, $scope, $location, Auth) {

  }])

  //POSTS
  .controller('TodosIndexCtrl', function ($scope, $location, Post, Auth) {
    Post.query(
      function(data) {
        $scope.todos = data
      },
      function(data) {
      }
    );

    $scope.todo = {};
    $scope.createTodo = function() {
      Post.save($scope.todo, 
        function(data){
          $scope.todos.push(data);
        },
        function(data) {
          alert("there was a problem saving your todo");
        }
      );
      $scope.todo = '';
    }

    $scope.deleteTodo = function(todo) {
      Post.delete({ id: todo._id });
      var index = $scope.todos.indexOf(todo)
      $scope.todos.splice(index, 1);
    }
  });