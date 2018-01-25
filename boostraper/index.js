const lodash = require('lodash');

module.exports = async (config, container) => {
    container.value('config', config);
    config.providers.forEach(provider => provider.register(container));

    let providers = config.providers.filter(provider => lodash.isFunction(provider.boot));
    for (let index = 0; index < providers.length; index++) {
        await providers[index].boot(container);
    }
    return container;
};