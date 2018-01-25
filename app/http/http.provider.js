const Koa    = require('koa');
const Router = require('koa-router');

exports.register = async (container) => {
    container.singleton('http.kernel', async () => {
        const app = new Koa();
        return app.use(async (context, next) => {
            context.container = container;
            await next();
        });
    });
    container.singleton('http.router', async () => {
        let config = await container.make('config');
        return new Router(config.http.routesOpts);
    })
};


exports.boot = async (container) => {
    let httpKernel = await container.make('http.kernel');
    let config     = await container.make('config');

    config.http.middleWares.forEach(middleware => httpKernel.use(middleware));
};