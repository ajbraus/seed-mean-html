/*
 * CONTROLLERS
 */

'use strict';

angular.module('myApp.controllers', [])
  .controller('MainCtrl', ['$rootScope', '$scope', '$location', function ($rootScope, $scope, $location) {
    // INITIALIZATION AND NAVBAR LOGIC
  }])

  //POSTS
  .controller('TodosIndexCtrl', ['$scope', '$location', 'Post', function ($scope, $location, Post) {
    // GET TODOS
    Post.query(
      function(data) {
        $scope.todos = data
      },
      function(data) {
      }
    );

    // NEW TODO
    $scope.todo = {};

    // CREATE A TODO
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

    // DELTE A TODO
    $scope.deleteTodo = function(todo) {
      Post.delete({ id: todo._id });
      var index = $scope.todos.indexOf(todo)
      $scope.todos.splice(index, 1);
    }
  }]);