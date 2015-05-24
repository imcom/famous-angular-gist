'use strict';

angular.module('famousAngularStarter',
  ['ngAnimate', 'ngCookies',
    'ngTouch', 'ngSanitize',
    'ngResource', 'ui.router',
    'famous.angular' ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'partials/main.html',
        controller: 'MainCtrl'
      })
      .state('service', {
        url: '/service',
        templateUrl: 'partials/service.html',
        controller: 'ServiceCtrl'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'partials/about.html',
        controller: 'AboutCtrl'
      });

    $urlRouterProvider.otherwise('/');
  });
