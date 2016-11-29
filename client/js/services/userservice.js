app.factory('userService', function($http) {
    return {
        authenticate: function() {
            return $http.get('/userapi/auth/facebook')
        },
        token: function() {
            return $http.get('/userapi/auth/facebook/callback')
        }
    }

})
