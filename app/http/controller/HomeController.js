class HomeController {
    static get dependencies() {
        return [];
    }

    async index(context) {
        context.body = 'Hello home page @@!';
    }
}

module.exports = HomeController;