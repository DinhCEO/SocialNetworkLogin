const facebook = require('./type/facebook');
const google   = require('./type/google');
const twitter  = require('./type/twitter');

const authManager = require('./auth.manager');

let AuthManager = new authManager();
AuthManager.registerAuth('facebook', new facebook());
AuthManager.registerAuth('google', new google());
AuthManager.registerAuth('twitter', new twitter());

module.exports = AuthManager;