class Credentials {
    constructor(access_token) {
        this.credential              = {};
        this.credential.accessToken = access_token;
    }

    getCredential() {
        return this.credential;
    }
}

module.exports = Credentials;