const config = {
    acl: {
        rules      : [
            {
                roles : ['guest', 'member'],
                allows: [
                    {resources: 'profile', permissions: 'get'},
                    // {resources: ['forums', 'news'], permissions: ['get', 'put', 'delete']}
                ]
            },
            // {
            //     roles : ['gold', 'silver'],
            //     allows: [
            //         {resources: 'cash', permissions: ['sell', 'exchange']},
            //         {resources: ['account', 'deposit'], permissions: ['put', 'delete']}
            //     ]
            // }
        ],
        acl_backend: 'memoryBackend'
    }
};

module.exports = config;