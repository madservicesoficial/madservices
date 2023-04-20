//-- Importamos la Tecnología Express para crear el servidor de MAD Services basado en Express.
var servidor = require('express');
//-- Importamos el Componente de Express que enrruta las paginas de MAD Services.
var rutasPost = servidor.Router();
//-- Importamos el Controlador del Registro de los Clientes.
const registroClientes = require('../ptoControl/registroClientes.js');
//-- Importamos el Controlador del Registro de las Empresas.
const registroEmpresas = require('../ptoControl/registroEmpresas.js');
//-- Importamos el Controlador del Inicio de Sesión de los Clientes.
const loginClientes = require('../ptoControl/loginClientes.js');
//-- Importamos el Controlador del Inicio de Sesión de las Empresas.
const loginEmpresas = require('../ptoControl/loginEmpresas.js');
//-- Importamos la función para autorizar como Miembro MAD para Registro.
const autorizacionMiembroMADRegistro = require('../ptoControl/autorizacionMiembroMADRegistro.js');
//-- Importamos la función para autorizar como Miembro MAD para Login.
const autorizacionMiembroMADLogin = require('../ptoControl/autorizacionMiembroMADLogin.js');

//-- Formulario de envío de datos para Iniciar Sesión como Cliente.
rutasPost.post('/login/cliente', loginClientes.clienteLogin);
//-- Formulario de envío de datos para Iniciar Sesión como Empresa.
rutasPost.post('/login/empresa', loginEmpresas.empresaLogin);
//-- Formulario de envío de datos para Iniciar Sesión como Miembro MAD.
rutasPost.post('/login/miembroMAD', loginMiembroMAD.miembroMADlogin);
//-- Formulario de envío de datos para Registrarse como Cliente.
rutasPost.post('/registrarse/cliente', registroClientes.clienteRegistrarse);
//-- Formulario de envío de datos para Registrarse como Empresa.
rutasPost.post('/registrarse/empresa', registroEmpresas.empresaRegistrarse);
//-- Formulario de envío de datos para Registrarse como Miembro MAD.
rutasPost.post('/registrarse/miembroMAD', registroMiembroMAD.miembroMADregistrarse);
//-- Formulario de autenticación como Miembro MAD para Registro.
rutasPost.post('/registrarse/autorizarR-miembroMAD', autorizacionMiembroMADRegistro.autorizacionMiembroMADRegistro);
//-- Formulario de autenticación como Miembro MAD para Login.
rutasPost.post('/login/autorizarL-miembroMAD', autorizacionMiembroMADLogin.autorizacionMiembroMADLogin);

//-- Exportamos las rutas con método POST.
module.exports = rutasPost;