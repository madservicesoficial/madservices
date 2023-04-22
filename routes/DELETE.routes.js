//-- Importamos la Tecnología Express para crear el servidor de MAD Services basado en Express.
var servidor = require('express');
//-- Importamos el Componente de Express que enrruta las paginas de MAD Services.
var rutasDelete = servidor.Router();
//-- Importamos la configuración de los formularios de darse de baja.
const darseBajaCliente = require('../ptoControl/darseBajaCliente.js');
const darseBajaMiembroMAD = require('../ptoControl/darseBajaMiembroMAD.js');

//---- Darse de baja de Clientes MAD Services.
rutasDelete.post('/sesion-cliente/:id/perfil/darse-baja-cliente', darseBajaCliente.perfilClientes);
//---- Darse de baja de Miembros MAD.
rutasDelete.post('/sesion-mad/MAD:id/interfaz/darse-baja-miembroMAD', darseBajaMiembroMAD.interfazMiembroMAD);

//-- Exportamos las rutas con método DELETE.
module.exports = rutasDelete;