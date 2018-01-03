const twitterAPI = require('node-twitter-api');
const twitter    = new twitterAPI({
    consumerKey   : process.env.twitter_consumerKey,
    consumerSecret: process.env.twitter_consumerSecret,
    callback      : process.env.twitter_callback
});

class TwitterService {

    getRequestToken() {
        return new Promise((resolve, reject) => {
            twitter.getRequestToken(function (error, requestToken, requestTokenSecret) {
                if (error) {
                    reject(error);
                }
                resolve({requestToken, requestTokenSecret});
            })
        });
    }

    accessToken(requestToken, requestTokenSecret, oauth_verifier) {
        return new Promise((resolve, reject) => {
            twitter.getAccessToken(requestToken, requestTokenSecret, oauth_verifier, (err, accessToken, accessSecret) => {
                if (err) {
                    reject(err);
                }
                resolve({accessToken, accessSecret});
            })
        })
    }

    verifyCredentials(accessToken, accessSecret, params) {
        return new Promise((resolve, reject) => {
            twitter.verifyCredentials(accessToken, accessSecret, params, (error, user) => {
                if (error) {
                    reject(error);
                }
                resolve(user);
            })
        })
    }


}

module.exports = TwitterService;