const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.PORT || 9999,
        dbURL: 'mongodb://localhost:27017/rest-api-db',
       // dbURL: 'mongodb://localhost:27017',
        authCookieName: 'x-auth-token',
        secret: 'secret'
    },
    production: {}
};

module.exports = config[env];
//module.exports={ url: 'mongodb://localhost:27017/rest-api-db'}