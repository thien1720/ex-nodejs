const newsRouters = require('./news');
const siteRouters = require('./site');

function route(app) {
    app.use('/news', newsRouters);
    app.use('/', siteRouters);
}

module.exports = route;
