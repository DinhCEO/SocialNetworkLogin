const request = require('request-promise');

class Google {
    login(credential) {
        let userFormat    = {};
        let optionsGoogle = {
            uri    : 'https://www.googleapis.com/plus/v1/people/me',
            qs     : {
                access_token: credential['accessToken'],
            },
            headers: {
                'User-Agent': 'Authenticate-Google'
            },
            json   : true
        };
        return new Promise((resolve, reject) => {
            request(optionsGoogle)
                .then(user => {
                    userFormat.email  = user.emails[0].value;
                    userFormat.avatar = user.image.url;
                    userFormat.name   = user.displayName;
                    userFormat.link   = user.url;
                    userFormat.size   = 50;
                    resolve(userFormat);
                })
                .catch(() => {
                    reject(null);
                });
        });
    }
}

module.exports = Google;

