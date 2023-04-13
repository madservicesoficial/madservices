//-- Importamos la Tecnología Express para crear el servidor de MAD Services basado en Express.
var servidor = require('express');
//-- Importamos el Componente de Express que enrruta las paginas de MAD Services.
var rutasFormulario = servidor.Router();
//-- Importamos el Controlador del Registro de los Clientes.
const registroClientes = require('../ptoControl/registroClientes.js');
//-- Importamos el Controlador del Registro de las Empresas.
const registroEmpresas = require('../ptoControl/registroEmpresas.js');
//-- Importamos el Controlador del Inicio de Sesión de los Clientes.
const loginClientes = require('../ptoControl/loginClientes.js');
//-- Importamos el Controlador del Inicio de Sesión de las Empresas.
const loginEmpresas = require('../ptoControl/loginEmpresas.js');

//-- Ruta a la Sección de Iniciar Sesión como Cliente.
rutasFormulario.get('/login/cliente', (req, res) => {
  res.render('paginas/clienteLogin');
});
rutasFormulario.post('/login/cliente', loginClientes.clienteLogin);

//-- Ruta a la Sección de Iniciar Sesión como Empresa.
rutasFormulario.get('/login/empresa', (req, res) => {
  res.render('paginas/empresaLogin');
});
rutasFormulario.post('/login/empresa', loginEmpresas.empresaLogin);

//-- Ruta a la Sección de Registrarse como Cliente.
rutasFormulario.get('/registrarse/cliente', (req, res) => {
  res.render('paginas/clienteRegistrarse');
});
rutasFormulario.post('/registrarse/cliente', registroClientes.clienteRegistrarse);

//-- Ruta a la Sección de Registrarse como Empresa.
rutasFormulario.get('/registrarse/empresa', (req, res) => {
  res.render('paginas/empresaRegistrarse');
});
rutasFormulario.post('/registrarse/empresa', registroEmpresas.empresaRegistrarse);

//-- Cerrar Sesión como Cliente o Empresa.
rutasFormulario.get('/cerrar-sesion', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

//-- Exportamos las rutas con método POST.
module.exports = rutasFormulario;