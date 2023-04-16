//-- Importamos la Tecnología Express para crear el servidor de MAD Services basado en Express.
var servidor = require('express');
//-- Importamos el Componente de Express que enrruta las paginas de MAD Services.
var rutasPatch = servidor.Router();
//-- Importamos la configuración de los formularios de actualización de los clientes y del formulario de darse de baja.
const actualizarNombreCliente = require('../ptoControl/actualizarNombreCliente.js');
const actualizarApellidosCliente = require('../ptoControl/actualizarApellidosCliente.js');
const actualizarGeneroCliente = require('../ptoControl/actualizarGeneroCliente.js');
const actualizarEmailCliente = require('../ptoControl/actualizarEmailCliente.js');
const actualizarPasswordCliente = require('../ptoControl/actualizarPasswordCliente.js');
const actualizarDomiciliacionCliente = require('../ptoControl/actualizarDomiciliacionCliente.js');
const darseBajaCliente = require('../ptoControl/darseBajaCliente.js');

//-- Formulario de actualización de datos para el Perfil Cliente.
//---- Nombre.
rutasPatch.patch('/sesion/:id/perfil/actualizar-nombre-cliente', actualizarNombreCliente.perfilClientes);
//---- Apellidos.
rutasPatch.patch('/sesion/:id/perfil/actualizar-apellidos-cliente', actualizarApellidosCliente.perfilClientes);
//---- Género.
rutasPatch.patch('/sesion/:id/perfil/actualizar-genero-cliente', actualizarGeneroCliente.perfilClientes);
//---- Email.
rutasPatch.patch('/sesion/:id/perfil/actualizar-email-cliente', actualizarEmailCliente.perfilClientes);
//---- Contraseña.
rutasPatch.patch('/sesion/:id/perfil/actualizar-password-cliente', actualizarPasswordCliente.perfilClientes);
//---- Domiciliación.
rutasPatch.patch('/sesion/:id/perfil/actualizar-domiciliacion-cliente', actualizarDomiciliacionCliente.perfilClientes);
//---- Darse de baja.
rutasPatch.patch('/sesion/:id/perfil/darse-baja-cliente', darseBajaCliente.perfilClientes);

//-- Exportamos las rutas con método PATCH.
module.exports = rutasPatch;