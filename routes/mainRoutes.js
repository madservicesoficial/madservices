//-- Importamos la Tecnología Express para crear el servidor de MAD Services basado en Express.
var servidor = require('express');
//-- Importamos el Componente de Express que enrruta las paginas de MAD Services.
var rutasMain = servidor.Router();

//-- Ruta al Inicio de MAD Services.
rutasMain.get('/', (req, res) => {
  res.render('paginas/inicio');
});

//-- Ruta a la Sección de Iniciar Sesión como Cliente o como Empresa.
rutasMain.get('/login', (req, res) => {
  res.render('paginas/login');
});

//-- Ruta a la Sección de Registrarse como Cliente o como Empresa.
rutasMain.get('/registrarse', (req, res) => {
  res.render('paginas/registrarse');
});

//-- Ruta a la Sección de Iniciar Sesión como Cliente.
rutasMain.get('/login/cliente', (req, res) => {
  res.render('paginas/clienteLogin');
});

//-- Ruta a la Sección de Iniciar Sesión como Empresa.
rutasMain.get('/login/empresa', (req, res) => {
  res.render('paginas/empresaLogin');
});

//-- Ruta a la Sección de Registrarse como Empresa.
rutasMain.get('/registrarse/empresa', (req, res) => {
  res.render('paginas/empresaRegistrarse');
});

//-- Exportamos las rutas con método GET.
module.exports = rutasMain;