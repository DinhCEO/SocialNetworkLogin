require('dotenv').config();
require('app-module-path').addPath(__dirname);

const config       = require('config');
const Container    = require('container');
const Bootstrap    = require('boostraper');
const EventEmitter = require('events').EventEmitter;

(async () => {
    let container  = await Bootstrap(config, new Container(new EventEmitter()));
    let httpKernel = await container.make('http.kernel');
    let router     = await container.make('http.router');
    httpKernel
        .use(router.routes())
        .use(router.allowedMethods());
    httpKernel.listen(config.http.PORT, () => {
        console.log(`server listening port ${config.http.PORT}`)
    });

})().catch(error => {
    console.error(error);
    process.exit(error.code);
});



