const request = require('request-promise');

class Facebook {
    login(credential) {
        let userFormat = {};
        let options    = {
            uri    : 'https://graph.facebook.com/me',
            qs     : {
                access_token: credential['accessToken'],
                fields      : 'last_name,name,email,gender,first_name,birthday,link,website,picture'
            },
            headers: {
                'User-Agent': 'Authenticate-Facebook'
            },
            json   : true
        };
        return new Promise((resolve, reject) => {
            request(options)
                .then(user => {
                    userFormat.email  = user.email;
                    userFormat.avatar = user.picture.data.url;
                    userFormat.name   = user.name;
                    userFormat.link   = user.link;
                    userFormat.size   = 50;
                    resolve(userFormat);
                })
                .catch((error) => {
                    reject({error});
                });
        });
    }
}

module.exports = Facebook;