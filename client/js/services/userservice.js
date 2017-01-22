app.factory('AllServices', function($http) {
  var service = {}

  service.signUp = function(data) {
    return $http.post('/signupapi', data)
  }

  return service
});
