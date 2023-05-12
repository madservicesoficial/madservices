//-- Importamos la Tecnología Express para crear el servidor de MAD Services basado en Express.
var servidor = require('express');
//-- Importamos el Componente de Express que enrruta las paginas de MAD Services.
var rutasGet = servidor.Router();
//-- Importamos la función que comprueba el ID de los clientes y saca los parámetros.
const mostrarClientedb = require('../modelos/clientes/mostrarCampos.js');
//-- Importamos la función que comprueba el ID de las empresas y saca los parámetros.
const mostrarEmpresadb = require('../modelos/empresas/mostrarCampos.js');
//-- Importamos la función que comprueba el ID de los Miembros MAD y saca los parámetros.
const mostrarMiembrodb = require('../modelos/miembros/mostrarCampos.js');
//-- Importamos la función que muestra los productos MAD.
const mostrarProductosMAD = require('../modelos/general/mostrarProductosMAD.js');
//-- Importamos la función que muestra los productos MAD desde el cliente.
const mostrarProductosMADclientes = require('../modelos/clientes/mostrarProductosMAD.js');
//-- Importamos la función que muestra los productos MAD desde un miembro MAD.
const mostrarProductosMADmiembros = require('../modelos/miembros/mostrarProductosMAD.js');
//-- Importamos la función que muestra los productos Multimarca o The Mall.
const mostrarProductosTheMall = require('../modelos/general/mostrarProductosTheMall.js');
//-- Importamos la función que muestra los productos Multimarca o The Mall desde el cliente.
const mostrarProductosTheMallCliente = require('../modelos/clientes/mostrarProductosTheMallCliente.js');
//-- Importamos la función que muestra los productos Multimarca o The Mall desde la empresa.
const mostrarProductosTheMallEmpresa = require('../modelos/empresas/mostrarProductosTheMallEmpresa.js');
//-- Importamos la función que muestra los productos Multimarca o The Mall desde un miembro MAD.
const mostrarProductosTheMallMiembroMAD = require('../modelos/miembros/mostrarProductosTheMallMiembroMAD.js');

//-- Ruta al Inicio de MAD Services.
rutasGet.get('/', (req, res) => {
  res.render('paginas/general/inicio');
  return res.end();
});

//-- Ruta al Inicio Autenticado del Cliente de MAD Services.
rutasGet.get('/sesion-cliente/:id', (req, res) => {
  let id = req.params.id;
  res.render('paginas/clientes/inicio', {id: id});
  return res.end();
});

//-- Ruta al Inicio Autenticado de la Empresa de MAD Services.
rutasGet.get('/sesion-empresa/:id', (req, res) => {
  let id = req.params.id;
  res.render('paginas/empresas/inicio', {id: id});
  return res.end();
});

//-- Ruta al Inicio Autenticado del Miembro MAD de MAD Services.
rutasGet.get('/sesion-miembro/:id', (req, res) => {
  let id = req.params.id;
  res.render('paginas/miembros/inicio', {id: id});
  return res.end();
});

//-- Ruta a la Sección de Iniciar Sesión como Cliente, Empresa o Miembro MAD.
rutasGet.get('/login', (req, res) => {
  res.render('paginas/general/login');
  return res.end();
});

//-- Ruta a la Sección de Iniciar Sesión como Cliente.
rutasGet.get('/login/cliente', (req, res) => {
  res.render('paginas/clientes/login');
  return res.end();
});

//-- Ruta a la Sección de Iniciar Sesión como Empresa.
rutasGet.get('/login/empresa', (req, res) => {
  res.render('paginas/empresas/login');
  return res.end();
});

//-- Ruta a autorizar al miembro MAD para Iniciar Sesión.
rutasGet.get('/login/autorizar', (req, res) => {
  res.render('paginas/miembros/autorizacionInicioSesion');
  return res.end();
});

//-- Ruta a la Sección de Iniciar Sesión como Miembro MAD.
rutasGet.get('/login/autorizar/miembro', (req, res) => {
  res.render('paginas/miembros/login');
  return res.end();
});

//-- Ruta a la Sección de Registrarse como Cliente, Empresa o Miembro MAD.
rutasGet.get('/registrarse', (req, res) => {
  res.render('paginas/general/registrarse');
  return res.end();
});

//-- Ruta a la Sección de Registrarse como Cliente.
rutasGet.get('/registrarse/cliente', (req, res) => {
  res.render('paginas/clientes/registrarse');
  return res.end();
});

//-- Ruta a la Sección de Registrarse como Empresa.
rutasGet.get('/registrarse/empresa', (req, res) => {
  res.render('paginas/empresas/registrarse');
  return res.end();
});

//-- Ruta a autorizar al miembro MAD para Registrarse.
rutasGet.get('/registrarse/autorizar', (req, res) => {
  res.render('paginas/miembros/autorizacionRegistro');
  return res.end();
});

//-- Ruta a la Sección de Registrarse como Miembro MAD.
rutasGet.get('/registrarse/autorizar/miembro', (req, res) => {
  res.render('paginas/miembros/registrarse');
  return res.end();
});

//-- Ruta a la Sección de Contacto.
rutasGet.get('/contacto', (req, res) => {
  res.render('paginas/general/contacto');
  return res.end();
});

//-- Ruta a la Sección de Contacto Autenticado del Cliente.
rutasGet.get('/sesion-cliente/:id/contacto', (req, res) => {
  let id = req.params.id;
  res.render('paginas/clientes/contacto', {id: id});
  return res.end();
});

//-- Ruta a la Sección de Contacto Autenticado de la Empresa.
rutasGet.get('/sesion-empresa/:id/contacto', (req, res) => {
  let id = req.params.id;
  res.render('paginas/empresas/contacto', {id: id});
  return res.end();
});

//-- Ruta a la Sección de Contacto Autenticado del Miembro MAD.
rutasGet.get('/sesion-miembro/:id/contacto', (req, res) => {
  let id = req.params.id;
  res.render('paginas/miembros/contacto', {id: id});
  return res.end();
});

//-- Ruta a la Sección de Trabaja con Nosotros.
rutasGet.get('/empleo', (req, res) => {
  res.render('paginas/general/empleo');
  return res.end();
});

//-- Ruta a la Sección de Trabaja con Nosotros Autenticado del Cliente.
rutasGet.get('/sesion-cliente/:id/empleo', (req, res) => {
  let id = req.params.id;
  res.render('paginas/clientes/empleo', {id: id});
  return res.end();
});

//-- Ruta a la Sección de Trabaja con Nosotros Autenticado de la Empresa.
rutasGet.get('/sesion-empresa/:id/empleo', (req, res) => {
  let id = req.params.id;
  res.render('paginas/empresas/empleo', {id: id});
  return res.end();
});

//-- Ruta a la Sección de Trabaja con Nosotros Autenticado del Miembro MAD.
rutasGet.get('/sesion-miembro/:id/empleo', (req, res) => {
  let id = req.params.id;
  res.render('paginas/miembros/empleo', {id: id});
  return res.end();
});

//-- Ruta a la Sección de Sobre MAD Services.
rutasGet.get('/conocenos', (req, res) => {
  res.render('paginas/general/conocemadservices');
  return res.end();
});

//-- Ruta a la Sección de Sobre MAD Services Autenticado del Cliente.
rutasGet.get('/sesion-cliente/:id/conocenos', (req, res) => {
  let id = req.params.id;
  res.render('paginas/clientes/conocemadservices', {id: id});
  return res.end();
});

//-- Ruta a la Sección de Sobre MAD Services Autenticado de la Empresa.
rutasGet.get('/sesion-empresa/:id/conocenos', (req, res) => {
  let id = req.params.id;
  res.render('paginas/empresas/conocemadservices', {id: id});
  return res.end();
});

//-- Ruta a la Sección de Sobre MAD Services Autenticado del Miembro MAD.
rutasGet.get('/sesion-miembro/:id/conocenos', (req, res) => {
  let id = req.params.id;
  res.render('paginas/miembros/conocemadservices', {id: id});
  return res.end();
});

//-- Ruta a la Sección de Entrada MAD de MAD Services.
rutasGet.get('/empieza', (req,res) => {
  res.render('paginas/general/entradaMAD');
  return res.end();
});

//-- Ruta a la Sección de Entrada MAD Autenticado del Cliente de MAD Services.
rutasGet.get('/sesion-cliente/:id/empieza', (req,res) => {
  let id = req.params.id;
  res.render('paginas/clientes/entradaMAD', {id: id});
  return res.end();
});

//-- Ruta a la Sección de Entrada MAD Autenticado de la Empresa de MAD Services.
rutasGet.get('/sesion-empresa/:id/empieza', mostrarProductosTheMallEmpresa);

//-- Ruta a la Sección de Entrada MAD Autenticado del Miembro MAD de MAD Services.
rutasGet.get('/sesion-miembro/:id/empieza', (req,res) => {
  let id = req.params.id;
  res.render('paginas/miembros/entradaMAD', {id: id});
  return res.end();
});

//-- Ruta a la Sección del Perfil de los Clientes de MAD Services.
rutasGet.get('/sesion-cliente/:id/perfil', mostrarClientedb);

//-- Ruta a la Sección de la Interfaz de las Empresas de MAD Services.
rutasGet.get('/sesion-empresa/:id/interfaz', mostrarEmpresadb);

//-- Ruta a la Sección de la Interfaz de los Miembros MAD de MAD Services.
rutasGet.get('/sesion-miembro/:id/interfaz', mostrarMiembrodb);

//-- Ruta a la Sección de los Productos MAD.
rutasGet.get('/empieza/productosmadservices', mostrarProductosMAD);

//-- Ruta a la Sección de los Productos MAD a través de la sesión del cliente.
rutasGet.get('/sesion-cliente/:id/empieza/productosmadservices', mostrarProductosMADclientes);

//-- Ruta a la Sección de los Productos MAD a través de la sesión del Miembro MAD.
rutasGet.get('/sesion-miembro/:id/empieza/productosmadservices', mostrarProductosMADmiembros);

//-- Ruta a la Sección de los Productos Multimarca o ruta al Centro Comercial - The Mall a través de la sesión del Cliente.
rutasGet.get('/empieza/themall', mostrarProductosTheMall);

//-- Ruta a la Sección de los Productos Multimarca o ruta al Centro Comercial - The Mall a través de la sesión del Cliente.
rutasGet.get('/sesion-cliente/:id/empieza/themall', mostrarProductosTheMallCliente);

//-- Ruta a la Sección de los Productos Multimarca o ruta al Centro Comercial - The Mall a través de la sesión del Miembro MAD.
rutasGet.get('/sesion-miembro/:id/empieza/themall', mostrarProductosTheMallMiembroMAD);

//-- Cerrar Sesión como Cliente, Empresa o Miembro MAD.
rutasGet.get('/', (req, res) => {
  return req.session.destroy();
});

//-- Exportamos las rutas con método GET.
module.exports = rutasGet;