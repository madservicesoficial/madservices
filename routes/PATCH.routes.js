//-- Importamos la Tecnología Express para crear el servidor de MAD Services basado en Express.
var servidor = require('express');
//-- Importamos el Componente de Express que enrruta las paginas de MAD Services.
var rutasPatch = servidor.Router();
//-- Importamos la configuración de los formularios de actualización de los clientes.
const actualizarPerfilCliente = require('../ptoControl/actualizarPerfilCliente.js');
//-- Importamos la configuración de los formularios de actualización de los Miembros MAD.
const actualizarInterfazMiembroMAD = require('../ptoControl/actualizarInterfazMiembroMAD.js');

//-- Formulario de actualización de datos del Perfil Cliente.
rutasPatch.post('/sesion-cliente/:id/perfil/actualizar-cliente', actualizarPerfilCliente.perfilClientes);
//-- Formulario de actualización de datos de la Interfaz Miembro MAD.
rutasPatch.post('/sesion-mad/MAD:id/interfaz/actualizar-miembroMAD', actualizarInterfazMiembroMAD.interfazMiembroMAD);

//-- Exportamos las rutas con método PATCH.
module.exports = rutasPatch;