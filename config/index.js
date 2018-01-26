module.exports = {
    http     : {
        PORT       : process.env.PORT,
        middleWares: [
            require('kcors')(),
            require('koa-bodyparser')(),
            //other middleware
        ],
        routesOpts : {
            prefix   : '',
            methods  : ['GET', 'PUT', 'POST', 'DELETE'],
            strict   : false,
            sensitive: true
        }
    },
    providers: [
        require('app/http/http.provider'),
        require('fusion/routing/routing.provider'),
        require('fusion/meta_injector/meta-injector.provider'),
        //other provider
    ],
    injects  : [
        require('app/http/controller/HomeController')
    ],
    routes   : require('./routes'),
};