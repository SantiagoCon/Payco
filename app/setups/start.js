//traemos nuestros paquetes
let express = require('express');
let compression = require('compression');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let path = require('path');
//cargamos nuestras rutas
let apiRouter = require('../router/apis/index').router;
let webRouter = require('../router/web/index').router;
//inicialisamos nuestra app
const app = express();

//configuramos nuestra app
app.use(compression()) // added compression

app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', '/public')));

const PORT = process.env.port || 3000;
const ENV = process.env.NODE_ENV || 'development';


app.use( '/api', apiRouter);

app.use('/', webRouter);

let server = app.listen(PORT, () => { console.log(`app is running in ${ENV} on port ${PORT}.`); });

require('./socket').init(server);
