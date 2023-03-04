const newsRouters = require('./news');
const siteRouters = require('./site');
const meRouters = require('./me');
const coursesRouters = require('./course');

function route(app) {
    app.use("/courses", coursesRouters)
    app.use('/news', newsRouters);
    app.use('/me', meRouters);
    app.use('/', siteRouters);
}

module.exports = route;
