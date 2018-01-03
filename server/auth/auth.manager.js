class AuthManager {
    constructor() {
        this.auths = {};
    }

    registerAuth(name, value) {
        this.auths[name] = value;
    }

    getAuth(name) {
        if (!this.auths[name]) {
            throw new Error(`${name} not supported!`);
        }
        return this.auths[name];
    }
}

module.exports = AuthManager;