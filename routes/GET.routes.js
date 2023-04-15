//-- Importamos la Tecnología Express para crear el servidor de MAD Services basado en Express.
var servidor = require('express');
//-- Importamos el Componente de Express que enrruta las paginas de MAD Services.
var rutasGet = servidor.Router();
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const madservicesdb = require('../config/database.js');
//-- Importamos la función de consulta del ID de clientes y empresas para asignarlo al recurso.
const { conseguirID } = require('../operacionesdb/operacionConseguirID.js');

//-- Ruta al Inicio de MAD Services.
rutasGet.get('/', (req, res) => {
  res.render('paginas/inicio');
  return res.end();
});

//-- Ruta al Inicio Autenticado de MAD Services.
rutasGet.get('/sesion/:id', (req, res) => {
  let id = req.params.id;
  conseguirID(madservicesdb, id, (userID) => {
    res.render('paginas/inicioAuth', { userID });
    return res.end();
  });
});

//-- Ruta a la Sección de Iniciar Sesión como Cliente o como Empresa.
rutasGet.get('/login', (req, res) => {
  res.render('paginas/login');
  return res.end();
});

//-- Ruta a la Sección de Iniciar Sesión como Cliente.
rutasGet.get('/login/cliente', (req, res) => {
  res.render('paginas/clienteLogin');
  return res.end();
});

//-- Ruta a la Sección de Iniciar Sesión como Empresa.
rutasGet.get('/login/empresa', (req, res) => {
  res.render('paginas/empresaLogin');
  return res.end();
});

//-- Ruta a la Sección de Registrarse como Cliente o como Empresa.
rutasGet.get('/registrarse', (req, res) => {
  res.render('paginas/registrarse');
  return res.end();
});

//-- Ruta a la Sección de Registrarse como Cliente.
rutasGet.get('/registrarse/cliente', (req, res) => {
  res.render('paginas/clienteRegistrarse');
  return res.end();
});

//-- Ruta a la Sección de Registrarse como Empresa.
rutasGet.get('/registrarse/empresa', (req, res) => {
  res.render('paginas/empresaRegistrarse');
  return res.end();
});

//-- Ruta a la Sección de Contacto.
rutasGet.get('/contacto', (req, res) => {
  res.render('paginas/contacto');
  return res.end();
});

//-- Ruta a la Sección de Contacto Autenticado.
rutasGet.get('/sesion/:id/contacto', (req, res) => {
  let id = req.params.id;
  conseguirID(madservicesdb, id, (userID) => {
    res.render('paginas/contactoAuth', { userID });
    return res.end();
  });
});

//-- Ruta a la Sección de Trabaja con Nosotros.
rutasGet.get('/empleo', (req, res) => {
  res.render('paginas/empleo');
  return res.end();
});

//-- Ruta a la Sección de Trabaja con Nosotros Autenticado.
rutasGet.get('/sesion/:id/empleo', (req, res) => {
  let id = req.params.id;
  conseguirID(madservicesdb, id, (userID) => {
    res.render('paginas/empleoAuth', { userID });
    return res.end();
  });
});

//-- Ruta a la Sección de Sobre MAD Services.
rutasGet.get('/conoceMADs', (req, res) => {
  res.render('paginas/conoceMADs');
  return res.end();
});

//-- Ruta a la Sección de Sobre MAD Services Autenticado.
rutasGet.get('/sesion/:id/conoceMADs', (req, res) => {
  let id = req.params.id;
  conseguirID(madservicesdb, id, (userID) => {
    res.render('paginas/conoceMADsAuth', { userID });
    return res.end();
  });
});

//-- Ruta a la Sección de Categorias de MAD Services.
rutasGet.get('/categorias', (req,res) => {
  res.render('paginas/categorias');
  return res.end();
});

//-- Ruta a la Sección de Categorias Autenticado de MAD Services.
rutasGet.get('/sesion/:id/categorias', (req,res) => {
  let id = req.params.id;
  conseguirID(madservicesdb, id, (userID) => {
    res.render('paginas/categoriasAuth', { userID });
    return res.end();
  });
});

//-- Cerrar Sesión como Cliente o Empresa.
rutasGet.get('/cerrar-sesion', (req, res) => {
  req.session.destroy();
  return res.redirect('/');
});

//-- Exportamos las rutas con método GET.
module.exports = rutasGet;