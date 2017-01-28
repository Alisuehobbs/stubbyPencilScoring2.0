app.factory('AllServices', function($http) {
  var service = {}

  service.signUp = function(data) {
    return $http.post('/signupapi', data)
  }

  service.login = function(data) {
    return $http.post('/loginapi', data)
  }

  return service
});
