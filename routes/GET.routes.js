//############################## PARTE GENERAL DE LAS RUTAS DE ACCESO ##############################//
//-- Importamos la Tecnología Express para crear el servidor de MAD Services basado en Express.
var servidor = require('express');
//-- Importamos el Componente de Express que enrruta las paginas de MAD Services.
var rutasGet = servidor.Router();
//##################################################################################################//





//######################################## ACCESO AL INICIO ########################################//
rutasGet.get('/', (req, res) => { res.render('paginas/general/inicio'); return res.end(); });
rutasGet.get('/sesion-cliente/:id', (req, res) => { let id = req.params.id; res.render('paginas/clientes/inicio', {id: id}); return res.end(); });
rutasGet.get('/sesion-empresa/:id', (req, res) => { let id = req.params.id; res.render('paginas/empresas/inicio', {id: id}); return res.end(); });
rutasGet.get('/sesion-miembro/:id', (req, res) => { let id = req.params.id; res.render('paginas/miembros/inicio', {id: id}); return res.end(); });
//##################################################################################################//





//######################## ACCESO A ELECCIÓN DEL INICIO DE SESIÓN/REGISTRO #########################//
rutasGet.get('/login', (req, res) => { res.render('paginas/general/login'); return res.end(); });
rutasGet.get('/registrarse', (req, res) => { res.render('paginas/general/registrarse'); return res.end(); });
//##################################################################################################//





//############################# ACCESO A AUTORIZACIÓN PARA MIEMBROS MAD ############################//
rutasGet.get('/login/autorizar', (req, res) => { res.render('paginas/miembros/autorizacionInicioSesion'); return res.end(); });
rutasGet.get('/registrarse/autorizar', (req, res) => { res.render('paginas/miembros/autorizacionRegistro'); return res.end(); });
//##################################################################################################//





//########################### ACCESO A TIPO DE INICIO DE SESIÓN/REGISTRO ###########################//
rutasGet.get('/login/cliente', (req, res) => { res.render('paginas/clientes/login'); return res.end(); });
rutasGet.get('/login/empresa', (req, res) => { res.render('paginas/empresas/login'); return res.end(); });
rutasGet.get('/login/autorizar/miembro', (req, res) => { res.render('paginas/miembros/login'); return res.end(); });
rutasGet.get('/registrarse/cliente', (req, res) => { res.render('paginas/clientes/registrarse'); return res.end(); });
rutasGet.get('/registrarse/empresa', (req, res) => { res.render('paginas/empresas/registrarse'); return res.end(); });
rutasGet.get('/registrarse/autorizar/miembro', (req, res) => { res.render('paginas/miembros/registrarse'); return res.end(); });
//##################################################################################################//





//######################################## ACCESO A CONTACTO #######################################//
rutasGet.get('/contacto', (req, res) => { res.render('paginas/general/contacto'); return res.end(); });
rutasGet.get('/sesion-cliente/:id/contacto', (req, res) => { let id = req.params.id; res.render('paginas/clientes/contacto', {id: id}); return res.end(); });
rutasGet.get('/sesion-empresa/:id/contacto', (req, res) => { let id = req.params.id; res.render('paginas/empresas/contacto', {id: id}); return res.end(); });
rutasGet.get('/sesion-miembro/:id/contacto', (req, res) => { let id = req.params.id; res.render('paginas/miembros/contacto', {id: id}); return res.end(); });
//##################################################################################################//





//####################################### ACCESO A CONOCE MAD ######################################//
rutasGet.get('/conocenos', (req, res) => { res.render('paginas/general/conocemadservices'); return res.end(); });
rutasGet.get('/sesion-cliente/:id/conocenos', (req, res) => { let id = req.params.id; res.render('paginas/clientes/conocemadservices', {id: id}); return res.end(); });
rutasGet.get('/sesion-empresa/:id/conocenos', (req, res) => { let id = req.params.id; res.render('paginas/empresas/conocemadservices', {id: id}); return res.end(); });
rutasGet.get('/sesion-miembro/:id/conocenos', (req, res) => { let id = req.params.id; res.render('paginas/miembros/conocemadservices', {id: id}); return res.end(); });
//##################################################################################################//





//################################# ACCESO A TÉRMINOS Y CONDICIONES ################################//
rutasGet.get('/terminos-condiciones', (req, res) => { let id = req.params.id; res.render('paginas/general/terminosCondiciones', {id: id}); return res.end(); });
rutasGet.get('/sesion-cliente/:id/terminos-condiciones', (req, res) => { let id = req.params.id; res.render('paginas/clientes/terminosCondiciones', {id: id}); return res.end(); });
rutasGet.get('/sesion-empresa/:id/terminos-condiciones', (req, res) => { let id = req.params.id; res.render('paginas/empresas/terminosCondiciones', {id: id}); return res.end(); });
rutasGet.get('/sesion-miembro/:id/terminos-condiciones', (req, res) => { let id = req.params.id; res.render('paginas/miembros/terminosCondiciones', {id: id}); return res.end(); });
//##################################################################################################//





//################################## ACCESO A TRABAJA CON NOSOTROS #################################//
rutasGet.get('/empleo', (req, res) => { res.render('paginas/general/empleo'); return res.end(); });
rutasGet.get('/sesion-cliente/:id/empleo', (req, res) => { let id = req.params.id; res.render('paginas/clientes/empleo', {id: id}); return res.end(); });
//##################################################################################################//





//#################################### ACCESO AL PERFIL/INTERFAZ ###################################//
const mostrarClientedb = require('../modelos/clientes/mostrarCampos.js');
const mostrarEmpresadb = require('../modelos/empresas/mostrarCampos.js');
const mostrarMiembrodb = require('../modelos/miembros/mostrarCampos.js');

rutasGet.get('/sesion-cliente/:id/perfil', mostrarClientedb);
rutasGet.get('/sesion-empresa/:id/interfaz', mostrarEmpresadb);
rutasGet.get('/sesion-miembro/:id/interfaz', mostrarMiembrodb);
//##################################################################################################//





//########################################## CERRAR SESIÓN #########################################//
rutasGet.get('/', (req, res) => { return req.session.destroy(); });
//##################################################################################################//





//######################### ACCESO A ELECCIÓN DE PRODUCTOS MAD O MULTIMARCA ########################//
rutasGet.get('/empieza', (req,res) => { res.render('paginas/general/entradaMAD'); return res.end(); });
rutasGet.get('/sesion-cliente/:id/empieza', (req,res) => { let id = req.params.id; res.render('paginas/clientes/entradaMAD', {id: id}); return res.end(); });
rutasGet.get('/sesion-miembro/:id/empieza', (req,res) => { let id = req.params.id; res.render('paginas/miembros/entradaMAD', {id: id}); return res.end(); });
//##################################################################################################//





//#################################### ACCESO A LOS PRODUCTOS MAD ##################################//
const mostrarProductosMAD = require('../modelos/general/mostrarProductosMAD.js');
const mostrarProductosMADclientes = require('../modelos/clientes/mostrarProductosMAD.js');
const mostrarProductosMADmiembros = require('../modelos/miembros/mostrarProductosMAD.js');

rutasGet.get('/empieza/productosmadservices', mostrarProductosMAD);
rutasGet.get('/sesion-cliente/:id/empieza/productosmadservices', mostrarProductosMADclientes);
rutasGet.get('/sesion-miembro/:id/empieza/productosmadservices', mostrarProductosMADmiembros);
//##################################################################################################//





//################################ ACCESO A LOS PRODUCTOS MULTIMARCA ###############################//
const mostrarProductosTheMall = require('../modelos/general/mostrarProductosTheMall.js');
const mostrarProductosTheMallCliente = require('../modelos/clientes/mostrarProductosTheMallCliente.js');
const mostrarProductosTheMallEmpresa = require('../modelos/empresas/mostrarProductosTheMallEmpresa.js');
const mostrarProductosTheMallMiembroMAD = require('../modelos/miembros/mostrarProductosTheMallMiembroMAD.js');

rutasGet.get('/empieza/themall', mostrarProductosTheMall);
rutasGet.get('/sesion-cliente/:id/empieza/themall', mostrarProductosTheMallCliente);
rutasGet.get('/sesion-empresa/:id/empieza', mostrarProductosTheMallEmpresa);
rutasGet.get('/sesion-miembro/:id/empieza/themall', mostrarProductosTheMallMiembroMAD);
//##################################################################################################//





//################################ ACCESO AL CARRITO POR EL CLIENTE ################################//
const mostrarCarrito = require('../modelos/clientes/mostrarCarrito.js');

rutasGet.get('/sesion-cliente/:id/carrito', mostrarCarrito);
//##################################################################################################//





//################################ ACCESO A LA COMPRA POR EL CLIENTE ###############################//
const mostrarCompraCliente = require('../modelos/clientes/mostrarCompraCliente.js');

rutasGet.get('/sesion-cliente/:id/carrito/comprar', mostrarCompraCliente);
//##################################################################################################//





//############################### ACCESO A EXPANDIR LOS PRODUCTOS MAD ##############################//
const mostrarExpansion = require('../modelos/general/mostrarExpansion.js');
const mostrarExpansionClientes = require('../modelos/clientes/mostrarExpansion.js');
const mostrarExpansionMiembros = require('../modelos/miembros/mostrarExpansion.js');

rutasGet.get('/empieza/productosmadservices/expandir:enumeracion', mostrarExpansion);
rutasGet.get('/sesion-cliente/:id/empieza/productosmadservices/expandir:enumeracion', mostrarExpansionClientes);
rutasGet.get('/sesion-miembro/:id/empieza/productosmadservices/expandir:enumeracion', mostrarExpansionMiembros);
//##################################################################################################//





//############################## ACCESO A ACTUALIZAR LOS PRODUCTOS MAD #############################//
rutasGet.get('/sesion-miembro/:id/empieza/productosmadservices/edicion:enumeracion', (req, res) => { let id = req.params.id; let enumeracion = req.params.enumeracion; res.render('paginas/miembros/edicion', {id: id, enumeracion: enumeracion}); return res.end(); });
//##################################################################################################//





//########################################### PUNTO DE UNIÓN ############################################//
module.exports = rutasGet;
//#######################################################################################################//