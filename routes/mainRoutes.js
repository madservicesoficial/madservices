//-- Importamos la Tecnología Express para crear el servidor de MAD Services basado en Express.
var servidor = require('express');
//-- Importamos el Componente de Express que enrruta las paginas de MAD Services.
var rutasMain = servidor.Router();

//-- Ruta al Inicio de MAD Services.
rutasMain.get('/', (req, res) => {
  return res.render('paginas/inicio');
});

//-- Ruta a la Sección de Iniciar Sesión como Cliente o como Empresa.
rutasMain.get('/login', (req, res) => {
  return res.render('paginas/login');
});

//-- Ruta a la Sección de Registrarse como Cliente o como Empresa.
rutasMain.get('/registrarse', (req, res) => {
  return res.render('paginas/registrarse');
});

//-- Ruta a la Sección de Contacto.
rutasMain.get('/contacto', (req, res) => {
  return res.render('paginas/contacto');
});

//-- Ruta a la Sección de Trabaja con Nosotros.
rutasMain.get('/empleo', (req, res) => {
  return res.render('paginas/empleo');
});

//-- Ruta a la Sección de Sobre MAD Services.
rutasMain.get('/conoceMADs', (req, res) => {
  return res.render('paginas/conoceMADs');
});

//-- Ruta a la Sección de Categorias de MAD Services.
rutasMain.get('/categorias', (req,res) => {
  return res.render('paginas/categorias');
});

//-- Exportamos las rutas con método GET.
module.exports = rutasMain;