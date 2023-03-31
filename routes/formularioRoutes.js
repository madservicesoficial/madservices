//-- Importamos la Tecnología Express para crear el servidor de MAD Services basado en Express.
var servidor = require('express');
//-- Importamos los archivos que controlan el registro de los Miembros de MAD Services.
var registroClientes = require('../ptoControl/registroClientes.js');
//-- Importamos el Componente de Express que enrruta las paginas de MAD Services.
var rutasFormulario = servidor.Router();

//-- Ruta a la Sección de Iniciar Sesión como Cliente.
rutasFormulario.get('/login/cliente', (req, res) => {
  res.render('paginas/clienteLogin');
});

//-- Ruta a la Sección de Iniciar Sesión como Empresa.
rutasFormulario.get('/login/empresa', (req, res) => {
  res.render('paginas/empresaLogin');
});

//-- Ruta a la Sección de Registrarse como Cliente.
rutasFormulario.get('/registrarse/cliente', (req, res) => {
  res.render('paginas/clienteRegistrarse');
});
rutasFormulario.post('/registrarse/cliente', registroClientes.clienteRegistrarse);

//-- Ruta a la Sección de Registrarse como Empresa.
rutasFormulario.get('/registrarse/empresa', (req, res) => {
  res.render('paginas/empresaRegistrarse');
});

//-- Exportamos las rutas con método POST.
module.exports = rutasFormulario;