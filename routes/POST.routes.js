//-- Importamos la Tecnología Express para crear el servidor de MAD Services basado en Express.
var servidor = require('express');
//-- Importamos el Componente de Express que enrruta las paginas de MAD Services.
var rutasPost = servidor.Router();
//-- Importamos el Controlador del Registro de los Clientes.
const registroClientes = require('../ptoControl/clientes/registrarse.js');
//-- Importamos el Controlador del Registro de las Empresas.
const registroEmpresas = require('../ptoControl/empresas/registrarse.js');
//-- Importamos el Controlador del Registro de los Miembros MAD.
const registroMiembros = require('../ptoControl/miembros/registrarse.js');
//-- Importamos el Controlador del Inicio de Sesión de los Clientes.
const iniciarSesionClientes = require('../ptoControl/clientes/iniciarSesion.js');
//-- Importamos el Controlador del Inicio de Sesión de las Empresas.
const iniciarSesionEmpresas = require('../ptoControl/empresas/iniciarSesion.js');
//-- Importamos el Controlador del Inicio de Sesión de los Miembros MAD.
const iniciarSesionMiembros = require('../ptoControl/miembros/iniciarSesion.js');
//-- Importamos la función para autorizar como Miembro MAD para Registro.
const autorizacionRegistroMiembros = require('../ptoControl/miembros/autorizacionRegistro.js');
//-- Importamos la función para autorizar como Miembro MAD para Login.
const autorizacionInicioSesionMiembros = require('../ptoControl/miembros/autorizacionInicioSesion.js');

//-- Formulario de envío de datos para Iniciar Sesión como Cliente.
rutasPost.post('/login/cliente', iniciarSesionClientes.login);
//-- Formulario de envío de datos para Iniciar Sesión como Empresa.
rutasPost.post('/login/empresa', iniciarSesionEmpresas.login);
//-- Formulario de autenticación como Miembro MAD para Login.
rutasPost.post('/login/autorizar', autorizacionInicioSesionMiembros.autorizacionLogin);
//-- Formulario de envío de datos para Iniciar Sesión como Miembro MAD.
rutasPost.post('/login/autorizar/miembro', iniciarSesionMiembros.login);
//-- Formulario de envío de datos para Registrarse como Cliente.
rutasPost.post('/registrarse/cliente', registroClientes.registrarse);
//-- Formulario de envío de datos para Registrarse como Empresa.
rutasPost.post('/registrarse/empresa', registroEmpresas.registrarse);
//-- Formulario de autenticación como Miembro MAD para Registro.
rutasPost.post('/registrarse/autorizar', autorizacionRegistroMiembros.autorizacionRegistro);
//-- Formulario de envío de datos para Registrarse como Miembro MAD.
rutasPost.post('/registrarse/autorizar/miembro', registroMiembros.registrarse);
//-- Formulario de envío de datos del CV.
rutasPost.post('/empleo');
//-- Formulario de envío de datos del CV para clientes.
rutasPost.post('/sesion-cliente/:id/empleo');
//-- Formulario de envío de datos del CV para empresas.
rutasPost.post('/sesion-empresa/:id/empleo');
//-- Formulario de envío de datos del CV para miembros MAD.
rutasPost.post('/sesion-miembro/:id/empleo');

//-- Exportamos las rutas con método POST.
module.exports = rutasPost;