const instagramAPI = require('instagram-node').instagram();

instagramAPI.use({
    client_id    : process.env.instagram_client_id,
    client_secret: process.env.instagram_client_secret
});

const INSTAGRAM_CALLBACK_URL = process.env.instagram_callback_url;

class InstagramService {
    getProfile(code) {
        return new Promise((resolve, reject) => {
            instagramAPI.authorize_user(code, INSTAGRAM_CALLBACK_URL, function (err, result) {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        })
    }

}

module.exports = InstagramService;