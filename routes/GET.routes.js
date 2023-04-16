//-- Importamos la Tecnología Express para crear el servidor de MAD Services basado en Express.
var servidor = require('express');
//-- Importamos el Componente de Express que enrruta las paginas de MAD Services.
var rutasGet = servidor.Router();
//-- Importamos la función que comprueba que no se repita el ID aleatorio.
const comprobarIDclientedb = require('../comprobarIDs/comprobarIDcliente.js');
//-- Importamos la función que solicita los datos del cliente para tenerlos en variables.
const comprobarDatosclientedb = require('../comprobarDatos/comprobarDatosCliente.js');
//-- Importamos la función que solicita los datos de la empresa para tenerlos en variables.
const comprobarDatosempresadb = require('../comprobarDatos/comprobarDatosEmpresa.js');

//-- Ruta al Inicio de MAD Services.
rutasGet.get('/', (req, res) => {
  res.render('paginas/inicio');
  return res.end();
});

//-- Ruta al Inicio Autenticado de MAD Services.
rutasGet.get('/sesion/:id', (req, res) => {
  let id = req.params.id;
  res.render('paginas/inicioAuth', {id: id});
  return res.end();
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
  res.render('paginas/contactoAuth', {id: id});
  return res.end();
});

//-- Ruta a la Sección de Trabaja con Nosotros.
rutasGet.get('/empleo', (req, res) => {
  res.render('paginas/empleo');
  return res.end();
});

//-- Ruta a la Sección de Trabaja con Nosotros Autenticado.
rutasGet.get('/sesion/:id/empleo', (req, res) => {
  let id = req.params.id;
  res.render('paginas/empleoAuth', {id: id});
  return res.end();
});

//-- Ruta a la Sección de Sobre MAD Services.
rutasGet.get('/conoceMADs', (req, res) => {
  res.render('paginas/conoceMADs');
  return res.end();
});

//-- Ruta a la Sección de Sobre MAD Services Autenticado.
rutasGet.get('/sesion/:id/conoceMADs', (req, res) => {
  let id = req.params.id;
  res.render('paginas/conoceMADsAuth', {id: id});
  return res.end();
});

//-- Ruta a la Sección de Categorias de MAD Services.
rutasGet.get('/categorias', (req,res) => {
  res.render('paginas/categorias');
  return res.end();
});

//-- Ruta a la Sección de Categorias Autenticado de MAD Services.
rutasGet.get('/sesion/:id/categorias', (req,res) => {
  let id = req.params.id;
  res.render('paginas/categoriasAuth', {id: id});
  return res.end();
});

//-- Ruta a la Sección del Perfil de los Clientes o de las Empresas de MAD Services.
rutasGet.get('/sesion/:id/perfil', (req,res) => {
  let id = req.params.id;
  comprobarIDclientedb
  (
    id,
    (existenciaID) => {
      if(existenciaID) {
        comprobarDatosclientedb
        (
          id,
          (datos) => {
            res.render('paginas/perfilClientes', {id: id, nombre: datos.nombre, apellidos: datos.apellidos});
            return res.end();
          }
        );
      }else {
        comprobarDatosempresadb
        (
          id,
          (datos) => {
            res.render('paginas/perfilEmpresas', {id: id, nombre: datos.nombre, apellidos: datos.apellidos});
            return res.end();
          }
        );
      }
    }
  );
});

//-- Cerrar Sesión como Cliente o Empresa.
rutasGet.get('/', (req, res) => {
  return req.session.destroy();
});

//-- Exportamos las rutas con método GET.
module.exports = rutasGet;