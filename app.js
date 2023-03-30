//-- E-COMMERCE DE LOS E-COMMERCES: MAD Services =>
//-- ########################################################################################## --//

//##############################################################################################################//
//-- DEPENDENCIAS, TECNOLOGÍAS E IMPORTACIONES USADAS =>
//-- Importamos la Tecnología HTTP Errors para indicar errores internos que el E-Commerce tiene en el código,
//-- y, así, el servidor no pueda generar código HTML para devolver al usuario.
var controladorErrores = require('http-errors');
//-- Importamos la Tecnología Express para crear el servidor de MAD Services basado en Express.
var servidor = require('express');
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
//-- Importamos las rutas de MAD Services.
var rutasMain = require('./routes/mainRoutes.js');
var rutasFormulario = require('./routes//formularioRoutes.js');
//##############################################################################################################//

//##############################################################################################################//
//-- CREACIÓN DEL SERVIDOR DE MAD SERVICES =>
var madservices = servidor();
//##############################################################################################################//

//##############################################################################################################//
//-- MIDDLEWARES O SOFTWARES INTERMEDIOS => Para analizar....                                                            
//-- 1. Las solicitudes HTTP.                                                                                  
//-- 2. Los ficheros JSON de la conexión.                                                                      
//-- 3. Los cuerpos codificados en URL que sólo examinan las solicitudes HTTP donde el encabezado Content-Type 
//-- coincida con la opción de tipo (para el Body y para la Tecnología Express en general).                    
//-- 4. Las Cookies que se encuentran en la conexión.                                                          
//-- 5. El favicon servido implícito predeterminado de MAD Services por parte del servidor.                    
madservices.use(analizadorSolicitudes('dev'));                                                                 
madservices.use(servidor.json());
madservices.use(servidor.urlencoded({ extended: true }));
madservices.use(analizadorCookies());
madservices.use(analizadorBody.json());
madservices.use(analizadorBody.urlencoded({ extended: true }));
madservices.use(analizadorFavicon(path.join(__dirname, 'public', 'favicon.ico')));
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