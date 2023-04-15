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

//-- Formulario de envío de datos para Iniciar Sesión como Cliente.
rutasPost.post('/login/cliente', loginClientes.clienteLogin);
//-- Formulario de envío de datos para Iniciar Sesión como Empresa.
rutasPost.post('/login/empresa', loginEmpresas.empresaLogin);
//-- Formulario de envío de datos para Registrarse como Cliente.
rutasPost.post('/registrarse/cliente', registroClientes.clienteRegistrarse);
//-- Formulario de envío de datos para Registrarse como Empresa.
rutasPost.post('/registrarse/empresa', registroEmpresas.empresaRegistrarse);

//-- Exportamos las rutas con método POST.
module.exports = rutasPost;