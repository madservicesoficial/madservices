//-- Importamos la Tecnología Express para crear el servidor de MAD Services basado en Express.
var servidor = require('express');
//-- Importamos el Componente de Express que enrruta las paginas de MAD Services.
var rutasGet = servidor.Router();
//-- Importamos la función que comprueba el ID de los clientes y saca los parámetros.
const sacarParametrosClientedb = require('../operacionesdb/operacionesParametrosClientes.js');
//-- Importamos la función que comprueba el ID de las empresas y saca los parámetros.
const sacarParametrosEmpresadb = require('../operacionesdb/operacionesParametrosEmpresas.js');
//-- Importamos la función que comprueba el ID de los Miembros MAD y saca los parámetros.
const sacarParametrosMiembroMADdb = require('../operacionesdb/operacionesParametrosMiembrosMAD.js');

//-- Ruta al Inicio de MAD Services.
rutasGet.get('/', (req, res) => {
  res.render('paginas/inicio');
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
  res.render('paginas/login');
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
  res.render('paginas/miembros/autorizacionLogin');
  return res.end();
});

//-- Ruta a la Sección de Iniciar Sesión como Miembro MAD.
rutasGet.get('/login/autorizar/miembro', (req, res) => {
  res.render('paginas/miembros/login');
  return res.end();
});

//-- Ruta a la Sección de Registrarse como Cliente, Empresa o Miembro MAD.
rutasGet.get('/registrarse', (req, res) => {
  res.render('paginas/registrarse');
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
  res.render('paginas/contacto');
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
  res.render('paginas/empleo');
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
  res.render('paginas/conocemadservices');
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

//-- Ruta a la Sección de Categorias de MAD Services.
rutasGet.get('/categorias', (req,res) => {
  res.render('paginas/categorias');
  return res.end();
});

//-- Ruta a la Sección de Categorias Autenticado del Cliente de MAD Services.
rutasGet.get('/sesion-cliente/:id/categorias', (req,res) => {
  let id = req.params.id;
  res.render('paginas/clientes/categorias', {id: id});
  return res.end();
});

//-- Ruta a la Sección de Categorias Autenticado de la Empresa de MAD Services.
rutasGet.get('/sesion-empresa/:id/categorias', (req,res) => {
  let id = req.params.id;
  res.render('paginas/empresas/categorias', {id: id});
  return res.end();
});

//-- Ruta a la Sección de Categorias Autenticado del Miembro MAD de MAD Services.
rutasGet.get('/sesion-miembro/:id/categorias', (req,res) => {
  let id = req.params.id;
  res.render('paginas/miembros/categorias', {id: id});
  return res.end();
});

//-- Ruta a la Sección del Perfil de los Clientes de MAD Services.
rutasGet.get('/sesion-cliente/:id/perfil', (req,res) => {
  let id = req.params.id;
  sacarParametrosClientedb
  (
    id,
    (tablaClientes) => {
        res.render('paginas/clientes/perfil', 
        {
          id: id,
          email: tablaClientes.email,
          password: tablaClientes.password,
          nombre: tablaClientes.nombre,
          apellidos: tablaClientes.apellidos,
          direccion: tablaClientes.direccion,
          poblacion: tablaClientes.poblacion,
          region: tablaClientes.region,
          pais: tablaClientes.pais,
          cp: tablaClientes.cp,
          genero: tablaClientes.genero
        });
        return res.end();
    }
  );
});

//-- Ruta a la Sección de la Interfaz de las Empresas de MAD Services.
rutasGet.get('/sesion-empresa/:id/interfaz', (req,res) => {
  let id = req.params.id;
  sacarParametrosEmpresadb
  (
    id,
    (tablaEmpresas) => {
        res.render('paginas/empresas/interfaz', 
        {
          id: id,
          email: tablaEmpresas.email,
          password: tablaEmpresas.password,
          marca: tablaEmpresas.marca,
          nif: tablaEmpresas.nif,
          tipo: tablaEmpresas.tipo,
          ebitda: tablaEmpresas.ebitda
        });
        return res.end();
    }
  );
});

//-- Ruta a la Sección de la Interfaz de los Miembros MAD de MAD Services.
rutasGet.get('/sesion-miembro/:id/interfaz', (req,res) => {
  let id = req.params.id;
  sacarParametrosMiembroMADdb
  (
    id,
    (tablaMiembroMAD) => {
        res.render('paginas/miembros/interfaz', 
        {
          id: id,
          email: tablaMiembroMAD.email,
          password: tablaMiembroMAD.password,
          miembro: tablaMiembroMAD.miembro,
          departamento: tablaMiembroMAD.departamento,
          genero: tablaMiembroMAD.genero
        });
        return res.end();
    }
  );
});

//-- Ruta a la Sección de los Productos MAD.
rutasGet.get('/categorias/productosmadservices', (req, res) => {
  res.render('paginas/productosmadservices');
  return res.end();
});

//-- Ruta a la Sección de los Productos MAD a través de la sesión del cliente.
rutasGet.get('/sesion-cliente/:id/categorias/productosmadservices', (req, res) => {
  let id = req.params.id;
  res.render('paginas/clientes/productosmadservices', {id: id});
  return res.end();
});

//-- Ruta a la Sección de los Productos MAD a través de la sesión del empresa.
rutasGet.get('/sesion-empresa/:id/categorias/productosmadservices', (req, res) => {
  let id = req.params.id;
  res.render('paginas/empresas/productosmadservices', {id: id});
  return res.end();
});

//-- Ruta a la Sección de los Productos MAD a través de la sesión del Miembro MAD.
rutasGet.get('/sesion-miembro/:id/categorias/productosmadservices', (req, res) => {
  let id = req.params.id;
  res.render('paginas/miembros/productosmadservices', {id: id});
  return res.end();
});

//-- Cerrar Sesión como Cliente, Empresa o Miembro MAD.
rutasGet.get('/', (req, res) => {
  return req.session.destroy();
});

//-- Exportamos las rutas con método GET.
module.exports = rutasGet;