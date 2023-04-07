//-- Importamos la Tecnología Express para crear el servidor de MAD Services basado en Express.
var servidor = require('express');
//-- Importamos el Componente de Express que enrruta las paginas de MAD Services.
var rutasFormulario = servidor.Router();
//-- Importamos el Controlador del Registro de los Clientes.
const registroClientes = require('../ptoControl/registroClientes.js');
//-- Importamos el Controlador del Registro de las Empresas.
const registroEmpresas = require('../ptoControl/registroEmpresas.js');

//-- Ruta a la Sección de Iniciar Sesión como Cliente.
rutasFormulario.get('/login/cliente', (req, res) => {
  return res.render('paginas/clienteLogin');
});
rutasFormulario.post('/:id');

//-- Ruta a la Sección de Iniciar Sesión como Empresa.
rutasFormulario.get('/login/empresa', (req, res) => {
  return res.render('paginas/empresaLogin');
});
rutasFormulario.post('/:id');

//-- Ruta a la Sección de Registrarse como Cliente.
rutasFormulario.get('/registrarse/cliente', (req, res) => {
  return res.render('paginas/clienteRegistrarse');
});
rutasFormulario.post('/', registroClientes.clienteRegistrarse);

//-- Ruta a la Sección de Registrarse como Empresa.
rutasFormulario.get('/registrarse/empresa', (req, res) => {
  return res.render('paginas/empresaRegistrarse');
});
rutasFormulario.post('/', registroEmpresas.empresaRegistrarse);

//-- Exportamos las rutas con método POST.
module.exports = rutasFormulario;