//-- Importamos la Tecnología Express para crear el servidor de MAD Services basado en Express.
var servidor = require('express');
//-- Importamos el Componente de Express que enrruta las paginas de MAD Services.
var rutasDelete = servidor.Router();
//-- Importamos la configuración de los formularios de darse de baja.
const darseBajaCliente = require('../controladores/clientes/darseBaja.js');
const darseBajaEmpresa = require('../controladores/empresas/darseBaja.js');
const darseBajaMiembro = require('../controladores/miembros/darseBaja.js');

//---- Darse de baja de Clientes MAD Services.
rutasDelete.post('/sesion-cliente/:id/perfil/darse-baja', darseBajaCliente.perfil);
//---- Darse de baja de Empresas MAD Services.
rutasDelete.post('/sesion-empresa/:id/interfaz/darse-baja', darseBajaEmpresa.interfaz);
//---- Darse de baja de Miembros MAD.
rutasDelete.post('/sesion-miembro/:id/interfaz/darse-baja', darseBajaMiembro.interfaz);

//-- Exportamos las rutas con método DELETE.
module.exports = rutasDelete;