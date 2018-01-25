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
        require('./../app/http/http.provider'),
        //other provider
    ],
};