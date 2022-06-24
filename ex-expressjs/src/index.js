const path = require('path');
const morgan = require('morgan');
const express = require('express');
const handlebars = require('express-handlebars');
const app = express();
const port = 3000;

const route = require('./routers');

app.use(express.static(path.join(__dirname, 'public')));
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

// HTTp logger
app.use(morgan('combined'));

// template engin
      app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
    }),
);
      app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, 'resources\\views'));

// Router init
      route(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
