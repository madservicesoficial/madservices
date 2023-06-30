//--##########################################################################################--//
//--####################### E-COMMERCE DE LOS E-COMMERCES: MAD Services ######################--//
//--##########################################################################################--//





//--##########################################################################################--//
//--################################## CREACIÓN DEL SERVIDOR #################################--//
//--##########################################################################################--//
const servidor = require('express');

const madservices = servidor();
//############################################################################################--//





//--##########################################################################################--//
//--############################ ACCESO A LAS VARIABLES DE ENTORNO ###########################--//
//--##########################################################################################--//
require('./config/env.js');
//############################################################################################--//





//--##########################################################################################--//
//--###################################### SUBTECNOLOGÍAS ####################################--//
//--##########################################################################################--//
const controladorErrores = require('http-errors');
const path = require('path');
const session = require('express-session');
const patchdeletemethods = require('method-override');
const analizadorCookies = require('cookie-parser');
const analizadorFavicon = require('serve-favicon');
const analizadorBody = require('body-parser');
const protectorCabeceras = require('helmet');
const controlAccesoHTTP = require('cors');

madservices.use(servidor.json());
madservices.use(servidor.urlencoded({ extended: true }));
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
const rutasGet = require('./routes/GET.routes.js');
const rutasPost = require('./routes/POST.routes.js');
const rutasPatch = require('./routes/PATCH.routes.js');
const rutasDelete = require('./routes/DELETE.routes.js');

madservices.use(rutasGet, rutasPost, rutasPatch, rutasDelete);
//############################################################################################--//





//--##########################################################################################--//
//--################ CONFIGURANDO VISTAS ESTÁTICAS, DISEÑO Y PÁGINAS DE ERROR ################--//
//--##########################################################################################--//
madservices.use(servidor.static(path.join(__dirname, 'public')));
madservices.set('views', path.join(__dirname, 'views'));
madservices.set('view engine', 'pug');
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





//########################################### PUNTO DE UNIÓN ############################################//
module.exports = madservices;
//#######################################################################################################//