const path = require('path');
const methodOverride = require('method-override')
const morgan = require('morgan');
const express = require('express');
const handlebars = require('express-handlebars');
const SortMiddlware = require("./app/middleware/SortMiddlware")

const app = express();
const port = 3000;

const route = require('./routers');
const db = require('./config/db')

// connect db
db.connect()

// overice mothod
app.use(methodOverride('_method'))

app.use(express.static(path.join(__dirname, 'public')));
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

// HTTp logger
app.use(morgan('combined'));

//custom Middleware
app.use(SortMiddlware)

// template engin
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers:{ 
            sum: (a,b) => a + b,
            sortable: (fiend, sort) =>{
                const sortType = fiend === sort.column ? sort.type : "default"
                const icons = {
                    default : "fa-solid fa-up-down",
                    asc : "fa-solid fa-arrow-up-short-wide",
                    desc : "fa-solid fa-arrow-up-wide-short"
                }
                const types = {
                    default : "desc",
                    asc: "desc",
                    desc: "asc"
                }

                const type = types[sortType]
                const icon =icons[sortType]

                return `<a href="?_sort&column=${fiend}&type=${type}"><i class="${icon}"></i></a>`
            }
        }
    }),
);
app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, 'resources', 'views'));

// Router init
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
