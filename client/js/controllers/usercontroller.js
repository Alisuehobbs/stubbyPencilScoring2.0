app.controller('UserController', function($scope, userService) {

    $scope.facebookAuth = function () {
      console.log('I was clicked');
      userService.authenticate()
      userService.token()
    }
})
