//############################# PARTE GENERAL DE LAS RUTAS DE ELIMINACIÓN ###############################//
//-- Importamos la Tecnología Express para crear el servidor de MAD Services basado en Express.
var servidor = require('express');
//-- Importamos el Componente de Express que enrruta las paginas de MAD Services.
var rutasDelete = servidor.Router();
//#######################################################################################################//





//######################################## ELIMINACIÓN DEL CLIENTE ######################################//
const darseBajaCliente = require('../controladores/clientes/eliminar/cliente.js');

rutasDelete.post('/sesion-cliente/:id/perfil/darse-baja', darseBajaCliente);
//#######################################################################################################//





//####################################### ELIMINACIÓN DE LA EMPRESA #####################################//
const darseBajaEmpresa = require('../controladores/empresas/eliminar/empresa.js');

rutasDelete.post('/sesion-empresa/:id/interfaz/darse-baja', darseBajaEmpresa);
//#######################################################################################################//





//###################################### ELIMINACIÓN DEL MIEMBRO MAD ####################################//
const darseBajaMiembro = require('../controladores/miembros/eliminar/miembro.js');

rutasDelete.post('/sesion-miembro/:id/interfaz/darse-baja', darseBajaMiembro);
//#######################################################################################################//





//######################### ELIMINACIÓN DE LOS PRODUCTOS MAD POR EL MIEMBRO MAD #########################//
const borrarProductoMAD = require('../controladores/miembros/eliminar/productoMAD.js');

rutasDelete.post('/sesion-miembro/:id/empieza/productosmadservices/borrar-producto', borrarProductoMAD);
//#######################################################################################################//





//##################### ELIMINACIÓN DE LOS PRODUCTOS MAD DEL CARRITO POR EL CLIENTE #####################//
const quitarProductos = require('../controladores/clientes/eliminar/delCarrito.js');

rutasDelete.post('/sesion-cliente/:id/carrito/quitar-producto', quitarProductos);
//#######################################################################################################//





//########################## ELIMINACIÓN DE LA TARJETA BANCARIA POR EL CLIENTE ##########################//
const borrarTarjetaBank = require('../controladores/clientes/eliminar/tarjetaBancaria.js');

rutasDelete.post('/sesion-cliente/:id/perfil/borrar-tarjeta', borrarTarjetaBank);
//#######################################################################################################//





//########################## ELIMINACIÓN DEL MARKETING DE LA EMPRESA ####################################//
const borrarDescripcionEmpresa = require('../controladores/empresas/eliminar/descripcion.js');
const borrarWhatsAppEmpresa = require('../controladores/empresas/eliminar/whatsApp.js');
const borrarInstagramEmpresa = require('../controladores/empresas/eliminar/instagram.js');
const borrarTwitterEmpresa = require('../controladores/empresas/eliminar/twitter.js');
const borrarPagWebEmpresa = require('../controladores/empresas/eliminar/pagWeb.js');

rutasDelete.post('/sesion-empresa/:id/interfaz/borrar-descripcion', borrarDescripcionEmpresa);
rutasDelete.post('/sesion-empresa/:id/interfaz/borrar-url-WhatsApp', borrarWhatsAppEmpresa);
rutasDelete.post('/sesion-empresa/:id/interfaz/borrar-url-Instagram', borrarInstagramEmpresa);
rutasDelete.post('/sesion-empresa/:id/interfaz/borrar-url-Twitter', borrarTwitterEmpresa);
rutasDelete.post('/sesion-empresa/:id/interfaz/borrar-url-PagWeb', borrarPagWebEmpresa);
//#######################################################################################################//





//########################################### PUNTO DE UNIÓN ############################################//
module.exports = rutasDelete;
//#######################################################################################################//