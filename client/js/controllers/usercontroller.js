app.controller('UserController', function($scope, AllServices, $location) {

    $scope.submitSignUp = function(newUser) {
        newUser.type = 'local'
        AllServices.signUp(newUser).success(function(returnedData) {
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

    $scope.submitLogIn = function (returningUser) {
      AllServices.login(returningUser).success(function(returnedData) {
        if (returnedData.length == undefined) {
          $scope.returningUser = {}
          $scope.logIn.$setPristine()
          $location.url('/profile')
        } else {
          $scope.error = returnedData
        }
      })
    }

})
