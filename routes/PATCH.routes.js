//-- Importamos la Tecnología Express para crear el servidor de MAD Services basado en Express.
var servidor = require('express');
//-- Importamos el Componente de Express que enrruta las paginas de MAD Services.
var rutasPatch = servidor.Router();
//-- Importamos la configuración de los formularios de actualización de los clientes.
const organizarPerfilCliente = require('../ptoControl/organizarPerfilCliente.js');

//-- Formulario de organización de datos del Perfil Cliente.
rutasPatch.post('/sesion-cliente/:id/perfil', organizarPerfilCliente.perfilClientes);

//-- Exportamos las rutas con método PATCH.
module.exports = rutasPatch;