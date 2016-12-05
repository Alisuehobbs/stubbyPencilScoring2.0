var knex = require('./knex')

module.exports = {

    createOrLogin: (profile, callback) => {
        knex('users')
            .where('email', profile.emails[0].value)
            .first()
            .then((user) => {
                if (user) {
                    knex('users')
                        .where('email', profile.emails[0].value)
                        .first()
                        .then((user) => {
                            callback(null, user);
                        })
                } else {
                    knex('users')
                        .insert({
                            first_name: profile._json.first_name,
                            last_name: profile._json.last_name,
                            email: profile.emails[0].value,
                            user_name: profile._json.name,
                            image: profile.photos[0].value,
                            type: 'facebook'
                        }, '*')
                        .then((user) => {
                            knex('users')
                                .where('email', profile.emails[0].value)
                                .first()
                                .then((user) => {
                                    callback(null, user);
                                })
                        })
                }
            })
    }
}
