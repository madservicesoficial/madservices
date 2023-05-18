//-- Importamos la Tecnología Express para crear el servidor de MAD Services basado en Express.
var servidor = require('express');
//-- Importamos el Componente de Express que enrruta las paginas de MAD Services.
var rutasDelete = servidor.Router();
//-- Importamos la configuración de los formularios de darse de baja.
const darseBajaCliente = require('../controladores/clientes/darseBaja.js');
const darseBajaEmpresa = require('../controladores/empresas/darseBaja.js');
const darseBajaMiembro = require('../controladores/miembros/darseBaja.js');
//-- Importamos la configuración para borrar el producto MAD.
const borrarProductoMAD = require('../controladores/miembros/borrarProductoMAD.js');
//-- Importamos la función para quitar productos del carrito de la compra.
const quitarProductos = require('../controladores/clientes/quitarProductos.js');
//-- Importamos la función que borra las tarjetas Bank.
const borrarTarjetaBank = require('../controladores/clientes/borrarTarjetaBank.js');

//-- Darse de baja de Clientes MAD Services.
rutasDelete.post('/sesion-cliente/:id/perfil/darse-baja', darseBajaCliente);
//-- Darse de baja de Empresas MAD Services.
rutasDelete.post('/sesion-empresa/:id/interfaz/darse-baja', darseBajaEmpresa);
//-- Darse de baja de Miembros MAD.
rutasDelete.post('/sesion-miembro/:id/interfaz/darse-baja', darseBajaMiembro);
//-- Borrar producto MAD.
rutasDelete.post('/sesion-miembro/:id/empieza/productosmadservices/borrar-producto', borrarProductoMAD);
//-- Formulario para quitar artículos al carrito de la compra.
rutasDelete.post('/sesion-cliente/:id/carrito/quitar-producto', quitarProductos);
//-- Formulario para que el cliente borre su tarjeta bancaria si quiere.
rutasDelete.post('/sesion-cliente/:id/perfil/borrar-tarjeta', borrarTarjetaBank);

//-- Exportamos las rutas con método DELETE.
module.exports = rutasDelete;