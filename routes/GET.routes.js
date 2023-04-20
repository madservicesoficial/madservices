//-- Importamos la Tecnología Express para crear el servidor de MAD Services basado en Express.
var servidor = require('express');
//-- Importamos el Componente de Express que enrruta las paginas de MAD Services.
var rutasGet = servidor.Router();
//-- Importamos la función que comprueba el ID de los clientes y saca los parámetros.
const sacarParametrosClientedb = require('../sacarParametros/sacarParametrosClientes.js');
//-- Importamos la función que comprueba el ID de los clientes y saca los parámetros.
const sacarParametrosEmpresadb = require('../sacarParametros/sacarParametrosEmpresas.js');

//-- Ruta al Inicio de MAD Services.
rutasGet.get('/', (req, res) => {
  res.render('paginas/inicio');
  return res.end();
});

//-- Ruta al Inicio Autenticado del Cliente de MAD Services.
rutasGet.get('/sesion-cliente/:id', (req, res) => {
  let id = req.params.id;
  res.render('paginas/inicioAuthCliente', {id: id});
  return res.end();
});

//-- Ruta al Inicio Autenticado de la Empresa de MAD Services.
rutasGet.get('/sesion-empresa/:id', (req, res) => {
  let id = req.params.id;
  res.render('paginas/inicioAuthEmpresa', {id: id});
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

//-- Ruta a la Sección de Iniciar Sesión como Miembro MAD.
rutasGet.get('/login/miembroMAD', (req, res) => {
  res.render('paginas/miembroMADlogin');
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

//-- Ruta a la Sección de Registrarse como Miembro MAD.
rutasGet.get('/registrarse/miembroMAD', (req, res) => {
  res.render('paginas/miembroMADregistrarse');
  return res.end();
});

//-- Ruta a autorizar al miembro MAD en Registrarse.
rutasGet.get('/registrarse/autorizarR-miembroMAD', (req, res) => {
  res.render('paginas/autorizacionMiembroMADRegistro');
  return res.end();
});

//-- Ruta a autorizar al miembro MAD en Iniciar Sesión.
rutasGet.get('/login/autorizarL-miembroMAD', (req, res) => {
  res.render('paginas/autorizacionMiembroMADLogin');
  return res.end();
});

//-- Ruta a la Sección de Contacto.
rutasGet.get('/contacto', (req, res) => {
  res.render('paginas/contacto');
  return res.end();
});

//-- Ruta a la Sección de Contacto Autenticado del Cliente.
rutasGet.get('/sesion-cliente/:id/contacto', (req, res) => {
  let id = req.params.id;
  res.render('paginas/contactoAuthCliente', {id: id});
  return res.end();
});

//-- Ruta a la Sección de Contacto Autenticado de la Empresa.
rutasGet.get('/sesion-empresa/:id/contacto', (req, res) => {
  let id = req.params.id;
  res.render('paginas/contactoAuthEmpresa', {id: id});
  return res.end();
});

//-- Ruta a la Sección de Trabaja con Nosotros.
rutasGet.get('/empleo', (req, res) => {
  res.render('paginas/empleo');
  return res.end();
});

//-- Ruta a la Sección de Trabaja con Nosotros Autenticado del Cliente.
rutasGet.get('/sesion-cliente/:id/empleo', (req, res) => {
  let id = req.params.id;
  res.render('paginas/empleoAuthCliente', {id: id});
  return res.end();
});

//-- Ruta a la Sección de Trabaja con Nosotros Autenticado de la Empresa.
rutasGet.get('/sesion-empresa/:id/empleo', (req, res) => {
  let id = req.params.id;
  res.render('paginas/empleoAuthEmpresa', {id: id});
  return res.end();
});

//-- Ruta a la Sección de Sobre MAD Services.
rutasGet.get('/conoceMADs', (req, res) => {
  res.render('paginas/conoceMADs');
  return res.end();
});

//-- Ruta a la Sección de Sobre MAD Services Autenticado del Cliente.
rutasGet.get('/sesion-cliente/:id/conoceMADs', (req, res) => {
  let id = req.params.id;
  res.render('paginas/conoceMADsAuthCliente', {id: id});
  return res.end();
});

//-- Ruta a la Sección de Sobre MAD Services Autenticado de la Empresa.
rutasGet.get('/sesion-empresa/:id/conoceMADs', (req, res) => {
  let id = req.params.id;
  res.render('paginas/conoceMADsAuthEmpresa', {id: id});
  return res.end();
});

//-- Ruta a la Sección de Categorias de MAD Services.
rutasGet.get('/categorias', (req,res) => {
  res.render('paginas/categorias');
  return res.end();
});

//-- Ruta a la Sección de Categorias Autenticado del Cliente de MAD Services.
rutasGet.get('/sesion-cliente/:id/categorias', (req,res) => {
  let id = req.params.id;
  res.render('paginas/categoriasAuthCliente', {id: id});
  return res.end();
});

//-- Ruta a la Sección de Categorias Autenticado de la Empresa de MAD Services.
rutasGet.get('/sesion-empresa/:id/categorias', (req,res) => {
  let id = req.params.id;
  res.render('paginas/categoriasAuthEmpresa', {id: id});
  return res.end();
});

//-- Ruta a la Sección del Perfil de los Clientes de MAD Services.
rutasGet.get('/sesion-cliente/:id/perfil', (req,res) => {
  let id = req.params.id;
  sacarParametrosClientedb
  (
    id,
    (tablaClientes) => {
        res.render('paginas/perfilClientes', 
        {
          id: id,
          nombre: tablaClientes.nombre,
          apellidos: tablaClientes.apellidos,
          genero: tablaClientes.genero,
          email: tablaClientes.email,
          password: tablaClientes.password,
          direccion: tablaClientes.direccion,
          poblacion: tablaClientes.poblacion,
          region: tablaClientes.region,
          pais: tablaClientes.pais,
          cp: tablaClientes.cp
        });
        return res.end();
    }
  );
});

//-- Ruta a la Sección del Perfil de las Empresas de MAD Services.
rutasGet.get('/sesion-empresa/:id/perfil', (req,res) => {
  let id = req.params.id;
  sacarParametrosEmpresadb
  (
    id,
    (tablaEmpresas) => {
        res.render('paginas/perfilEmpresas', 
        {
          id: id,
          nombredelaempresa: tablaEmpresas.nombre,
          nif: tablaEmpresas.nif,
          email: tablaEmpresas.email,
          password: tablaEmpresas.password,
          tiposoc: tablaEmpresas.tiposoc
        });
        return res.end();
    }
  );
});

//-- Ruta a la Sección de los Productos MAD.
rutasGet.get('/categorias/productosMAD', (req, res) => {
  res.render('paginas/productosMAD');
  return res.end();
});

//-- Ruta a la Sección de los Productos MAD a través de la sesión del cliente.
rutasGet.get('/sesion-cliente/:id/categorias/productosMAD', (req, res) => {
  res.render('paginas/productosMADcliente');
  return res.end();
});

//-- Ruta a la Sección de los Productos MAD a través de la sesión del empresa.
rutasGet.get('/sesion-empresa/:id/categorias/productosMAD', (req, res) => {
  res.render('paginas/productosMADempresa');
  return res.end();
});

//-- Cerrar Sesión como Cliente o Empresa.
rutasGet.get('/', (req, res) => {
  return req.session.destroy();
});

//-- Exportamos las rutas con método GET.
module.exports = rutasGet;