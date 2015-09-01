/*
 * SERVICES
 */

'use strict';

angular.module('myApp.services', [])
  .factory('Post', function ($resource, HOST) {
    return $resource(HOST + '/api/posts/:id', { id: '@id' })
  })

  .factory('User', ['$resource', 'HOST', function ($resource, HOST) {
    return $resource(HOST + '/api/users/:id', { id: '@id' }, {
      update: { method: 'PUT' },
      sign_up: { url: HOST + '/api/users', method: 'POST', isArray: false },
      login: { url: HOST + '/api/users/login', method: 'POST', isArray: false },
      logout: { url: HOST + '/api/users/logout', method: 'GET', isArray: false }
    })
  }])

  .factory('Auth', [function() {
    return {
      isLoggedIn: function () {
        return !!localStorage.getItem('jwtToken')
      }
    }
  }])

  // ADD AUTH INTERCEPTOR 
  .factory('authInterceptor', ['$rootScope', '$q', '$window', '$location', function ($rootScope, $q, $window, $location) {
    return {
      request: function (config) {
        config.headers = config.headers || {};
        if ($window.localStorage.jwtToken) {
          config.headers.Authorization = 'Bearer ' + $window.localStorage.jwtToken;
        }
        return config;
      },
      response: function (response) {
        return response
      },
      responseError: function (rejection) {    // error response 
        console.log("http status", rejection.status);
        if (rejection.status === 401) {
          // handle the case where the user is not authenticated
          console.log($window.localStorage)
          $window.localStorage.removeItem('jwtToken')
        }
        rejection.data = ''
        $location.path('/login')
        return rejection
      }
    };
  }])

  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });