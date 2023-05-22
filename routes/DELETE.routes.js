//############################# PARTE GENERAL DE LAS RUTAS DE ELIMINACIÓN ###############################//
//-- Importamos la Tecnología Express para crear el servidor de MAD Services basado en Express.
var servidor = require('express');
//-- Importamos el Componente de Express que enrruta las paginas de MAD Services.
var rutasDelete = servidor.Router();
//#######################################################################################################//





//######################################## ELIMINACIÓN DEL CLIENTE ######################################//
const darseBajaCliente = require('../controladores/clientes/eliminar/darseBaja.js');

rutasDelete.post('/sesion-cliente/:id/perfil/darse-baja', darseBajaCliente);
//#######################################################################################################//





//####################################### ELIMINACIÓN DE LA EMPRESA #####################################//
const darseBajaEmpresa = require('../controladores/empresas/eliminar/darseBaja.js');

rutasDelete.post('/sesion-empresa/:id/interfaz/darse-baja', darseBajaEmpresa);
//#######################################################################################################//





//###################################### ELIMINACIÓN DEL MIEMBRO MAD ####################################//
const darseBajaMiembro = require('../controladores/miembros/eliminar/darseBaja.js');

rutasDelete.post('/sesion-miembro/:id/interfaz/darse-baja', darseBajaMiembro);
//#######################################################################################################//





//######################### ELIMINACIÓN DE LOS PRODUCTOS MAD POR EL MIEMBRO MAD #########################//
const borrarProductoMAD = require('../controladores/miembros/eliminar/borrarProductoMAD.js');

rutasDelete.post('/sesion-miembro/:id/empieza/productosmadservices/borrar-producto', borrarProductoMAD);
//#######################################################################################################//





//##################### ELIMINACIÓN DE LOS PRODUCTOS MAD DEL CARRITO POR EL CLIENTE #####################//
const quitarProductos = require('../controladores/clientes/eliminar/quitarProductos.js');

rutasDelete.post('/sesion-cliente/:id/carrito/quitar-producto', quitarProductos);
//#######################################################################################################//





//########################## ELIMINACIÓN DE LA TARJETA BANCARIA POR EL CLIENTE ##########################//
const borrarTarjetaBank = require('../controladores/clientes/eliminar/borrarTarjetaBank.js');

rutasDelete.post('/sesion-cliente/:id/perfil/borrar-tarjeta', borrarTarjetaBank);
//#######################################################################################################//





//########################################### PUNTO DE UNIÓN ############################################//
module.exports = rutasDelete;
//#######################################################################################################//