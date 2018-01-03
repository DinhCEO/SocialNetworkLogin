const facebook = require('./type/facebook');
const google   = require('./type/google');

const authManager = require('./auth.manager');

let AuthManager = new authManager();
AuthManager.registerAuth('facebook', new facebook());
AuthManager.registerAuth('google', new google());

module.exports = AuthManager;