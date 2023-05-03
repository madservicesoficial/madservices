//-- Importamos la Tecnología Express para crear el servidor de MAD Services basado en Express.
var servidor = require('express');
//-- Importamos el Componente de Express que enrruta las paginas de MAD Services.
var rutasPatch = servidor.Router();
//-- Importamos la configuración de los formularios de actualización de los clientes.
const actualizarCliente = require('../controladores/clientes/actualizar.js');
//-- Importamos la configuración de los formularios de actualización de las empresas.
const actualizarEmpresa = require('../controladores/empresas/actualizar.js');
//-- Importamos la configuración de los formularios de actualización de los miembros MAD.
const actualizarMiembro = require('../controladores/miembros/actualizarMiembro.js');
const actualizarDepartamento = require('../controladores/miembros/actualizarDepartamento.js');
const actualizarGenero = require('../controladores/miembros/actualizarGenero.js');
const actualizarEmail = require('../controladores/miembros/actualizarEmail.js');
const actualizarPassword = require('../controladores/miembros/actualizarPassword.js');

//-- Formulario de actualización de datos del Perfil Cliente.
rutasPatch.post('/sesion-cliente/:id/perfil/actualizar', actualizarCliente.perfil);
//-- Formulario de actualización de datos de la Interfaz Empresa.
rutasPatch.post('/sesion-empresa/:id/interfaz/actualizar', actualizarEmpresa.interfaz);
//-- Formulario de actualización de datos de la Interfaz Miembro MAD.
rutasPatch.post('/sesion-miembro/:id/interfaz/actualizar-miembro', actualizarMiembro);
rutasPatch.post('/sesion-miembro/:id/interfaz/actualizar-departamento', actualizarDepartamento);
rutasPatch.post('/sesion-miembro/:id/interfaz/actualizar-genero', actualizarGenero);
rutasPatch.post('/sesion-miembro/:id/interfaz/actualizar-email', actualizarEmail);
rutasPatch.post('/sesion-miembro/:id/interfaz/actualizar-password', actualizarPassword);

//-- Exportamos las rutas con método PATCH.
module.exports = rutasPatch;