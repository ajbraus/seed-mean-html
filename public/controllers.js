/*
 * CONTROLLERS
 */

'use strict';

angular.module('myApp.controllers', [])
  .controller('MainCtrl', ['$rootScope', '$scope', '$location', function ($rootScope, $scope, $location) {
    // INITIALIZATION AND NAVBAR LOGIC
  }])

  //POSTS
  .controller('PostsIndexCtrl', ['$scope', '$location', '$http', function ($scope, $location, $http) {
    // GET POSTS
    $http.get('/api/posts')
      .success(function(data) {
        $scope.posts = data;
      })
      .error(function(data) {

      });

    // NEW POST
    $scope.post = {};

    // CREATE A POST
    $scope.createPost = function() {
      $http.post('/api/posts', $scope.post)
        .success(function(data){
          $scope.posts.unshift(data);
        })
        .error(function(data) {
          alert("there was a problem saving your post");
        })
      $scope.post = {};
    }

    // DELETE A POST
    $scope.deletePost = function(post) {
      $http.delete('/api/posts/' + post._id)
        .success(function(data){
          var index = $scope.posts.indexOf(post)
          $scope.posts.splice(index, 1);          
        })
        .error(function(data) {

        })
    }
  }]);