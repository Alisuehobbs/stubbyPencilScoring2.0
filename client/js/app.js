var app = angular.module('stubby', ['ngRoutes','ngResource', 'ngAnimate', 'ngCookies'])

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '../views/main.html',
            controller: 'UserController'
        })
        .when('/signup', {
            templateUrl: '../views/signup.html',
            controller: 'UserController'
        })
        .when('/login', {
            templateUrl: '../views/login.html',
            controller: 'UserController'
        })
        .when('/profile:id', {
          templateUrl: '../views/oneprofile.html',
          controller: 'ProfileController'
        })
        .when('/creategame', {
          templateUrl: '../views/creategame.html',
          controller: 'GameController'
        })
        .when('/scorecard:id', {
          templateUrl: '../views/scorecard.html',
          controller: 'ScoreController'
        })

});


//CalculatorController...  RoundsController
