/*
 * CONTROLLERS
 */

'use strict';

angular.module('myApp.controllers', [])
  .controller('MainCtrl', ['$rootScope', '$scope', '$location', 'Auth', function ($rootScope, $scope, $location, Auth) {
    // LOGOUT 
    $scope.logout = function() {
      localStorage.removeItem('jwtToken');
      $location.path('/login')
      $scope.isLoggedIn = false;
    }

    // CHECK IF LOGGED IN (IF JWT TOKEN PRESENT)
    $scope.isLoggedIn = Auth.isLoggedIn();

    // ON LOGIN UPDATE NAVBAR
    $rootScope.$on('loggedIn', function () {
      $scope.isLoggedIn = true
    })
  }])

  .controller('LoginCtrl', function ($rootScope, $scope, User, $location, Auth) {
    $scope.user = {};
    $scope.login = function() {
      console.log($scope.user)
      console.log('logging in')
      User.login({}, $scope.user,
        function (data) {
          console.log(data.token)
          localStorage.setItem("jwtToken", data.token);
          $rootScope.$broadcast('loggedIn'); // TELL THE OTHER CONTROLLERS WE'RE LOGGED IN
          $location.path('/');
        },
        function (data) {
          var message = "Invalid Email or Password"
          console.log(message)
        }
      );
    };
  })

  //POSTS
  .controller('TodosIndexCtrl', function ($scope, $location, Post, Auth) {
    Post.query(
      function(data) {
        $scope.todos = data
      },
      function(data) {
        $location.path('/login');
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