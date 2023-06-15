//--##########################################################################################--//
//--####################### E-COMMERCE DE LOS E-COMMERCES: MAD Services => ###################--//
//--##########################################################################################--//

//##############################################################################################################//
//-- DEPENDENCIAS, TECNOLOGÍAS E IMPORTACIONES USADAS =>
//-- Importamos la Tecnología HTTP Errors para indicar errores internos que el E-Commerce tiene en el código,
//-- y, así, el servidor no pueda generar código HTML para devolver al usuario.
var controladorErrores = require('http-errors');
//-- Importamos la configuración del entorno ENV para poder usar su información.
require('./config/env.js');
//-- Importamos la Tecnología Express para crear el servidor de MAD Services basado en Express.
var servidor = require('express');
//-- Importamos el Componente de la Tecnología Express para que los Miembros de MAD Services se puedan autenticar.
var session = require('express-session');
//-- Importamos la tecnología para poder usar los métodos PATCH y DELETE.
const patchdeletemethods = require('method-override');
//-- Importamos la Tecnología que enrruta todas las rutas de MAD Services.
var path = require('path');
var analizadorCookies = require('cookie-parser');
//-- Importamos la Tecnología basada, exclusivamente, en servir el favicon implícito predeterminado.
//-- Para iconos adicionales específicos del proveedor que requieren Marcado HTML, se requiere middleware adicional para servir los archivos relevantes.
var analizadorFavicon = require('serve-favicon');
var analizadorBody = require('body-parser');
//-- Importamos la Tecnología de Protección de Cabeceras HTTP.
var protectorCabeceras = require('helmet');
var controlAccesoHTTP = require('cors');
//-- Importamos las rutas de MAD Services.
var rutasGet = require('./routes/GET.routes.js');
var rutasPost = require('./routes/POST.routes.js');
var rutasPatch = require('./routes/PATCH.routes.js');
var rutasDelete = require('./routes/DELETE.routes.js');
//##############################################################################################################//

//##############################################################################################################//
//-- CREACIÓN DEL SERVIDOR DE MAD SERVICES =>
var madservices = servidor();
//##############################################################################################################//

//##############################################################################################################//
//-- SESIÓN EN MAD SERVICES =>
madservices.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: { secure: true }
}));
//##############################################################################################################//

//##############################################################################################################//
//-- MIDDLEWARES O SOFTWARES INTERMEDIOS => Para....                                                                          
//-- 1. Trabajar con los ficheros JSON de la conexión.                                                                      
//-- 2. Analizar los cuerpos codificados en URL que sólo examinan las solicitudes HTTP donde el encabezado Content-Type 
//-- coincida con la opción de tipo (para el Body y para la Tecnología Express en general).                                                      
//-- 6. Analizar el favicon servido implícito predeterminado de MAD Services por parte del servidor.
//-- 7. Analizar las cabeceras HTTP de cada conexión.
//-- 8. Analizar el Control de Acceso HTTP de cada conexión.
//-- 9. Configurar la Protección de Cabeceras HTTP.
//-- 10. Configurar la función que protege las Cabeceras HTTP de malwares y otros peligros informáticos.
//-- 11. Poder usar los métodos PATCH y DELETE.                                                                                                                 
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
//##############################################################################################################//

//##############################################################################################################//
//-- PUNTO DE ENTRADA A LOS ARCHIVOS ESTÁTICOS Y A LOS MOTORES DE VISTAS DEL FRONT-END =>
madservices.use(servidor.static(path.join(__dirname, 'public')));
madservices.set('views', path.join(__dirname, 'views'));
madservices.set('view engine', 'pug');
//##############################################################################################################//

//##############################################################################################################//
//-- RUTAS DE MAD SERVICES =>
madservices.use(rutasGet, rutasPost, rutasPatch, rutasDelete);
//##############################################################################################################//

//##############################################################################################################//
//-- CONTROL DE ERRORES DE LAS PÁGINAS NO EXISTENTES Y RENDERIZACIÓN DE SU PROPIA PÁGINA NOT FOUND =>
madservices.use(function(req, res, next) {
  next(controladorErrores(404));
});
madservices.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('paginas/error');
});
//##############################################################################################################//

//##############################################################################################################//
//-- PUNTO DE SALIDA A OTROS ESPACIOS DE MAD SERVICES =>
module.exports = madservices;
//##############################################################################################################//