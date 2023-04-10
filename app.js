//-- E-COMMERCE DE LOS E-COMMERCES: MAD Services =>
//-- ########################################################################################## --//

//##############################################################################################################//
//-- DEPENDENCIAS, TECNOLOGÍAS E IMPORTACIONES USADAS =>
//-- Importamos la Tecnología HTTP Errors para indicar errores internos que el E-Commerce tiene en el código,
//-- y, así, el servidor no pueda generar código HTML para devolver al usuario.
var controladorErrores = require('http-errors');
//-- Importamos la Tecnología Express para crear el servidor de MAD Services basado en Express.
var servidor = require('express');
//-- Importamos el Componente de la Tecnología Express para que los Miembros de MAD Services se puedan autenticar.
var session = require('express-session');
//-- Importamos la Tecnología para validar datos enviados por el cliente.
var { body, validationResult } = require("express-validator");
//-- Importamos la Tecnología que enrruta todas las rutas de MAD Services.
var path = require('path');
//-- Importamos la Tecnología basada en un middleware que analiza el encabezado Cookie y, rellena req.cookies 
//-- con objeto marcado con los nombres de las cookies.
var analizadorCookies = require('cookie-parser');
//-- Importamos la Tecnología basada en un middleware o módulo que controla y registra solicitudes HTTP en producción
//-- para Node JS, mostrándolas por consola.
var analizadorSolicitudes = require('morgan');
//-- Importamos la Tecnología basada, exclusivamente, en servir el favicon implícito predeterminado.
//-- Para iconos adicionales específicos del proveedor que requieren Marcado HTML, se requiere middleware adicional para servir los archivos relevantes.
var analizadorFavicon = require('serve-favicon');
//-- Importamos la Tecnología basada en un middleware que analiza los cuerpos de solicitud entrantes,
//-- antes de sus controladores y, está disponible bajo el objeto req.body.
var analizadorBody = require('body-parser');
//-- Importamos la Tecnología de Protección de Cabeceras HTTP.
var protectorCabeceras = require('helmet');
//-- Importamos la Tecnología de Control de Acceso HTTP que intercambia Recursos de Origen Cruzado (Crossed Origin ResourceS - CORS),
//-- para utilizar cabeceras HTTP adicionales y, para permitir que un agente de usuario obtenga permiso para acceder a recursos
//-- seleccionados desde un servidor en un origen distinto al que pertenece.
var controlAccesoHTTP = require('cors');
//-- Importamos las rutas de MAD Services.
var rutasMain = require('./routes/mainRoutes.js');
var rutasFormulario = require('./routes/formularioRoutes.js');
//##############################################################################################################//

//##############################################################################################################//
//-- CREACIÓN DEL SERVIDOR DE MAD SERVICES =>
var madservices = servidor();
//##############################################################################################################//

//##############################################################################################################//
//-- SESIONES EN MAD SERVICES =>
madservices.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: true }
}));
//##############################################################################################################//

//##############################################################################################################//
//-- MIDDLEWARES O SOFTWARES INTERMEDIOS => Para analizar....                                                            
//-- 1. Las solicitudes HTTP.                                                                                  
//-- 2. Los ficheros JSON de la conexión.                                                                      
//-- 3. Los cuerpos codificados en URL que sólo examinan las solicitudes HTTP donde el encabezado Content-Type 
//-- coincida con la opción de tipo (para el Body y para la Tecnología Express en general).                    
//-- 4. Las Cookies que se encuentran en la conexión.                                                          
//-- 5. El favicon servido implícito predeterminado de MAD Services por parte del servidor.
//-- 6. Las cabeceras HTTP de cada conexión.
//-- 7. El Control de Acceso HTTP de cada conexión.
//-- 8. La Protección de Cabeceras HTTP.
//-- 9. La función que protege las Cabeceras HTTP de malwares y otros peligros informáticos.                                                        
madservices.use(analizadorSolicitudes('dev'));                                                                 
madservices.use(servidor.json());
madservices.use(servidor.urlencoded({ extended: true }));
madservices.use(analizadorCookies());
madservices.use(analizadorBody.json());
madservices.use(analizadorBody.urlencoded({ extended: true }));
madservices.use(analizadorFavicon(path.join(__dirname, 'public', 'favicon.ico')));
madservices.use((req, res, next) => {
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  //-- Metodos de Solicitud permitidos.
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  // Encabezados permitidos.
  res.setHeader('Access-Control-Allow-Headers', '*');

  next();
});
madservices.use(controlAccesoHTTP());
madservices.use(protectorCabeceras());
madservices.disable('x-powered-by');
//##############################################################################################################//

//##############################################################################################################//
//-- PUNTO DE ENTRADA A LOS ARCHIVOS ESTÁTICOS Y A LOS MOTORES DE VISTAS DEL FRONT-END =>
madservices.use(servidor.static(path.join(__dirname, 'public')));
madservices.set('views', path.join(__dirname, 'views'));
madservices.set('view engine', 'pug');
//##############################################################################################################//

//##############################################################################################################//
//-- RUTAS DE MAD SERVICES =>
madservices.use(rutasMain, rutasFormulario);
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