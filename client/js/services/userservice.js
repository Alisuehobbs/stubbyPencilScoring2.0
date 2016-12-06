app.service('UserService', function($resource) {
    return {
        register: $resource('userapi/:id', {id: '@id'}, {
            'save': {
            method: 'POST',
            isArray: true
            }
          })
    }
})
