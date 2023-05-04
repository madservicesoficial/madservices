//-- Importamos la Tecnología Express para crear el servidor de MAD Services basado en Express.
var servidor = require('express');
//-- Importamos el Componente de Express que enrruta las paginas de MAD Services.
var rutasPatch = servidor.Router();
//-- Importamos la configuración de los formularios de actualización de los Clientes.
const actualizarNombre = require('../controladores/clientes/actualizarNombre.js');
const actualizarApellidos = require('../controladores/clientes/actualizarApellidos.js');
const actualizarGeneroCliente = require('../controladores/clientes/actualizarGenero.js');
const actualizarEmailCliente = require('../controladores/clientes/actualizarEmail.js');
const actualizarPasswordCliente = require('../controladores/clientes/actualizarPassword.js');
const actualizarDireccion = require('../controladores/clientes/actualizarDireccion.js');
const actualizarPoblacion = require('../controladores/clientes/actualizarPoblacion.js');
const actualizarRegion = require('../controladores/clientes/actualizarRegion.js');
const actualizarPais = require('../controladores/clientes/actualizarPais.js');
const actualizarCP = require('../controladores/clientes/actualizarCP.js');
//-- Importamos la configuración de los formularios de actualización de las Empresas.
const actualizarEmpresa = require('../controladores/empresas/actualizar.js');
//-- Importamos la configuración de los formularios de actualización de los Miembros MAD.
const actualizarMiembro = require('../controladores/miembros/actualizarMiembro.js');
const actualizarDepartamento = require('../controladores/miembros/actualizarDepartamento.js');
const actualizarGenero = require('../controladores/miembros/actualizarGenero.js');
const actualizarEmail = require('../controladores/miembros/actualizarEmail.js');
const actualizarPassword = require('../controladores/miembros/actualizarPassword.js');

//-- Formulario de actualización de datos del Perfil Cliente.
rutasPatch.post('/sesion-cliente/:id/perfil/actualizar-nombre', actualizarNombre);
rutasPatch.post('/sesion-cliente/:id/perfil/actualizar-apellidos', actualizarApellidos);
rutasPatch.post('/sesion-cliente/:id/perfil/actualizar-genero', actualizarGeneroCliente);
rutasPatch.post('/sesion-cliente/:id/perfil/actualizar-email', actualizarEmailCliente);
rutasPatch.post('/sesion-cliente/:id/perfil/actualizar-password', actualizarPasswordCliente);
rutasPatch.post('/sesion-cliente/:id/perfil/actualizar-direccion', actualizarDireccion);
rutasPatch.post('/sesion-cliente/:id/perfil/actualizar-poblacion', actualizarPoblacion);
rutasPatch.post('/sesion-cliente/:id/perfil/actualizar-region', actualizarRegion);
rutasPatch.post('/sesion-cliente/:id/perfil/actualizar-pais', actualizarPais);
rutasPatch.post('/sesion-cliente/:id/perfil/actualizar-cp', actualizarCP);
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