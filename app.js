//--##########################################################################################--//
//--####################### E-COMMERCE DE LOS E-COMMERCES: MAD Services ######################--//
//--##########################################################################################--//





//--##########################################################################################--//
//--###################################### SUBTECNOLOGÍAS ####################################--//
//--##########################################################################################--//
var controladorErrores = require('http-errors');
var servidor = require('express');
var path = require('path');
var session = require('express-session');

var madservices = servidor();
madservices.use(servidor.json());
madservices.use(servidor.urlencoded({ extended: true }));
//-- Conectando con la interfaz de usuario o front-end.
madservices.use(servidor.static(path.join(__dirname, 'public')));
madservices.set('views', path.join(__dirname, 'views'));
madservices.set('view engine', 'pug');
//-- Configurando las páginas de Error de la aplicación web.
madservices.use(function(req, res, next) {
  next(controladorErrores(404));
});
madservices.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('paginas/error');
});
//############################################################################################--//





//--##########################################################################################--//
//--############################ ACCESO A LAS VARIABLES DE ENTORNO ###########################--//
//--##########################################################################################--//
require('./config/env.js');
//############################################################################################--//





//--##########################################################################################--//
//--######################################## MIDDLEWARES #####################################--//
//--##########################################################################################--//
const patchdeletemethods = require('method-override');
var analizadorCookies = require('cookie-parser');
var analizadorFavicon = require('serve-favicon');
var analizadorBody = require('body-parser');
var protectorCabeceras = require('helmet');
var controlAccesoHTTP = require('cors');

madservices.use(analizadorCookies(process.env.COOKIE_SECRET));
madservices.use(analizadorBody.json());
madservices.use(analizadorBody.urlencoded({ extended: true }));
madservices.use(analizadorFavicon(path.join(__dirname, 'public', 'favicon.ico')));
madservices.use((req, res, next) => {
  //-- Dominio que tengan acceso.
  res.setHeader('Access-Control-Allow-Origin', '*');
  //-- Metodos de solicitud que deseas permitir.
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  //-- Encabecedados que permites.
  res.setHeader('Access-Control-Request-Headers', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Expose-Headers', '*');
  res.setHeader('Access-Control-Allow-Credentials', '*');
  res.setHeader('Access-Control-Max-Age', '*');

  next();
});
madservices.use(controlAccesoHTTP());
madservices.use(protectorCabeceras());
madservices.disable('x-powered-by');
madservices.use(patchdeletemethods('_method', { methods: ['POST', 'GET', 'PATCH', 'DELETE'] }));
//############################################################################################--//





//--##########################################################################################--//
//--################################# SESIONES Y AUTENTICACIÓN ###############################--//
//--##########################################################################################--//
madservices.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: { secure: true }
}));
//############################################################################################--//





//--##########################################################################################--//
//--################################## CONEXIÓN CON LAS RUTAS ################################--//
//--##########################################################################################--//
var rutasGet = require('./routes/GET.routes.js');
var rutasPost = require('./routes/POST.routes.js');
var rutasPatch = require('./routes/PATCH.routes.js');
var rutasDelete = require('./routes/DELETE.routes.js');

madservices.use(rutasGet, rutasPost, rutasPatch, rutasDelete);
//############################################################################################--//





//########################################### PUNTO DE UNIÓN ############################################//
module.exports = madservices;
//#######################################################################################################//