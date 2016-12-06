app.controller('UserController', function($scope, UserService, $location) {

    $scope.submitSignUp = function(newUser) {
        newUser.type = 'local'
        UserService.register.save(newUser, function(returnedData) {
          const user = returnedData[0]
            if (user.length == undefined) {
                $scope.newUser = {}
                $scope.signUp.$setPristine()
                $location.url('/profile')
            } else {
            $scope.error = returnedData[0]
          }
        })
    }

})
