//-- Importamos la Tecnología Express para crear el servidor de MAD Services basado en Express.
var servidor = require('express');
//-- Importamos el Componente de Express que enrruta las paginas de MAD Services.
var rutasMain = servidor.Router();

//-- Ruta al Inicio de MAD Services.
rutasMain.get('/', (req, res) => {
  res.render('paginas/inicio');
  return res.end();
});

//-- Ruta al Inicio Autenticado de MAD Services.
rutasMain.get('/:id', (req, res) => {
  res.render('paginas/inicioAuth');
  return res.end();
});

//-- Ruta a la Sección de Iniciar Sesión como Cliente o como Empresa.
rutasMain.get('/login', (req, res) => {
  res.render('paginas/login');
  return res.end();
});

//-- Ruta a la Sección de Registrarse como Cliente o como Empresa.
rutasMain.get('/registrarse', (req, res) => {
  res.render('paginas/registrarse');
  return res.end();
});

//-- Ruta a la Sección de Contacto.
rutasMain.get('/contacto', (req, res) => {
  res.render('paginas/contacto');
  return res.end();
});

//-- Ruta a la Sección de Contacto Autenticado.
rutasMain.get('/:id/contacto', (req, res) => {
  res.render('paginas/contacto');
  return res.end();
});

//-- Ruta a la Sección de Trabaja con Nosotros.
rutasMain.get('/empleo', (req, res) => {
  res.render('paginas/empleo');
  return res.end();
});

//-- Ruta a la Sección de Trabaja con Nosotros Autenticado.
rutasMain.get('/:id/empleo', (req, res) => {
  res.render('paginas/empleo');
  return res.end();
});

//-- Ruta a la Sección de Sobre MAD Services.
rutasMain.get('/conoceMADs', (req, res) => {
  res.render('paginas/conoceMADs');
  return res.end();
});

//-- Ruta a la Sección de Categorias de MAD Services.
rutasMain.get('/categorias', (req,res) => {
  res.render('paginas/categorias');
  return res.end();
});

//-- Exportamos las rutas con método GET.
module.exports = rutasMain;