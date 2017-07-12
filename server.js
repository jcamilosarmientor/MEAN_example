// Inicialización
var express  = require('express');
var app      = express();                     // Utilizamos express
var mongoose = require('mongoose');                 // mongoose para mongodb
var path = require('path');
var http = require('http');
var express = require('express');
var logger = require('morgan');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');

// Configuracion
mongoose.connect('mongodb://127.0.0.1:27017/test', {
  useMongoClient: true,
});     // Hacemos la conexión a la base de datos de Mongo con nombre "test"

// Conectandose a la bd de mongo
mongoose.connection.on('connecting', function() {
  console.log('Conectandose a la bd de mongo...');
});

// Error al conectarse a la bd de mongo
mongoose.connection.on('error', function(err) {
  console.log('Error al conectase a la bd de mongo ' + err);
});

// Conectado un error al conectarse a la bd de mongo
mongoose.connection.on('connected', function(success) {
  console.log('Conectado a la bd de mongo ');
});

app.use(express.static(path.join(__dirname, '/angular/')));
app.use(logger('dev'));            // activamos el log en modo 'dev'
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());

// Cargamos los endpoints
require('./app/routes.js')(app);
// Cogemos el puerto para escuchar
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

var server = http.createServer(app);
app.listen(3000, function () {
  console.log('listening on port 3000');
});
