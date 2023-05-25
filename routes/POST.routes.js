//############################ PARTE GENERAL DE LAS RUTAS DE PROCESAMIENTO ##############################//
//-- Importamos la Tecnología Express para crear el servidor de MAD Services basado en Express.
var servidor = require('express');
//-- Importamos el Componente de Express que enrruta las paginas de MAD Services.
var rutasPost = servidor.Router();
//-- Importamos la Tecnología para almacenar las imágenes introducidas.
const multer = require('multer');
//#######################################################################################################//





//################## PROCESAMIENTO DE LA AUTORIZACIÓN DEL MIEMBRO MAD PARA LOGIN/REGISTRO ###############//
const autorizacionRegistroMiembros = require('../controladores/miembros/autorizar/registro.js');
const autorizacionInicioSesionMiembros = require('../controladores/miembros/autorizar/inicioSesion.js');

rutasPost.post('/registrarse/autorizar', autorizacionRegistroMiembros);
rutasPost.post('/login/autorizar', autorizacionInicioSesionMiembros);
//#######################################################################################################//





//##################################### PROCESAMIENTO DEL REGISTRO ######################################//
const registroClientes = require('../controladores/clientes/entrada/registrarse.js');
const registroEmpresas = require('../controladores/empresas/entrada/registrarse.js');
const registroMiembros = require('../controladores/miembros/entrada/registrarse.js');

rutasPost.post('/registrarse/cliente', registroClientes);
rutasPost.post('/registrarse/empresa', registroEmpresas);
rutasPost.post('/registrarse/autorizar/miembro', registroMiembros);
//#######################################################################################################//





//################################# PROCESAMIENTO DEL INICIO DE SESIÓN ##################################//
const iniciarSesionClientes = require('../controladores/clientes/entrada/iniciarSesion.js');
const iniciarSesionEmpresas = require('../controladores/empresas/entrada/iniciarSesion.js');
const iniciarSesionMiembros = require('../controladores/miembros/entrada/iniciarSesion.js');

rutasPost.post('/login/cliente', iniciarSesionClientes);
rutasPost.post('/login/empresa', iniciarSesionEmpresas);
rutasPost.post('/login/autorizar/miembro', iniciarSesionMiembros);
//#######################################################################################################//





//######################## PROCESAMIENTO DEL INGRESO POR PARTE DEL MIEMBRO MAD ##########################//
const ingresoProductosMAD = require('../controladores/miembros/ingresar/productosMAD.js');
const ingresarArchivosMultimediaMAD = require('../controladores/miembros/ingresar/archivosMultimediaMAD.js');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './archivos');
    },
    filename: (req, file, callback) => {
        const extension = file.originalname.split('.').pop();
        callback(null, `${Date.now()}.${extension}`);
    }
});
const upload = multer({ storage: storage });
const cargas = multer({ storage: storage });
rutasPost.post('/sesion-miembro/:id/interfaz/nuevo-producto', upload.single('portada'), ingresoProductosMAD);
rutasPost.post('/sesion-miembro/:id/empieza/productosmadservices/expandir:enumeracion/add-multimedia', cargas.single('multimedia'), ingresarArchivosMultimediaMAD);
//#######################################################################################################//





//############################# PROCESAMIENTO DEL MARKETING DE LA EMPRESA ###############################//
const ingresoDescripcionEmpresa = require('../controladores/empresas/ingresar/descripcion.js');
const ingresoWhatsAppEmpresa = require('../controladores/empresas/ingresar/whatsApp.js');
const ingresoInstagramEmpresa = require('../controladores/empresas/ingresar/instagram.js');
const ingresoTwitterEmpresa = require('../controladores/empresas/ingresar/twitter.js');
const ingresoPagWebEmpresa = require('../controladores/empresas/ingresar/pagWeb.js');

rutasPost.post('/sesion-empresa/:id/interfaz/add-descripcion', ingresoDescripcionEmpresa);
rutasPost.post('/sesion-empresa/:id/interfaz/add-url-WhatsApp', ingresoWhatsAppEmpresa);
rutasPost.post('/sesion-empresa/:id/interfaz/add-url-Instagram', ingresoInstagramEmpresa);
rutasPost.post('/sesion-empresa/:id/interfaz/add-url-Twitter', ingresoTwitterEmpresa);
rutasPost.post('/sesion-empresa/:id/interfaz/add-url-PagWeb', ingresoPagWebEmpresa);
//#######################################################################################################//





//################################ PROCESAMIENTO DEL FILTRO DE BÚSQUEDA #################################//
const busquedaPorTitulo = require('../controladores/general/buscar/porTitulo.js');
const busquedaPorTituloEnCliente = require('../controladores/clientes/buscar/porTitulo.js');
const busquedaPorTituloEnMiembro = require('../controladores/miembros/buscar/porTitulo.js');
const busquedaPorCategoria = require('../controladores/general/buscar/porCategoria.js');
const busquedaPorCategoriaEnCliente = require('../controladores/clientes/buscar/porCategoria.js');
const busquedaPorCategoriaEnMiembro = require('../controladores/miembros/buscar/porCategoria.js');
const busquedaPorPrecio = require('../controladores/general/buscar/porPrecio.js');
const busquedaPorPrecioEnCliente = require('../controladores/clientes/buscar/porPrecio.js');
const busquedaPorPrecioEnMiembro = require('../controladores/miembros/buscar/porPrecio.js');

rutasPost.post('/empieza/productosmadservices/busqueda-titulo', busquedaPorTitulo);
rutasPost.post('/sesion-cliente/:id/empieza/productosmadservices/busqueda-titulo', busquedaPorTituloEnCliente);
rutasPost.post('/sesion-miembro/:id/empieza/productosmadservices/busqueda-titulo', busquedaPorTituloEnMiembro);
rutasPost.post('/empieza/productosmadservices/busqueda-categoria', busquedaPorCategoria);
rutasPost.post('/sesion-cliente/:id/empieza/productosmadservices/busqueda-categoria', busquedaPorCategoriaEnCliente);
rutasPost.post('/sesion-miembro/:id/empieza/productosmadservices/busqueda-categoria', busquedaPorCategoriaEnMiembro);
rutasPost.post('/empieza/productosmadservices/busqueda-precio', busquedaPorPrecio);
rutasPost.post('/sesion-cliente/:id/empieza/productosmadservices/busqueda-precio', busquedaPorPrecioEnCliente);
rutasPost.post('/sesion-miembro/:id/empieza/productosmadservices/busqueda-precio', busquedaPorPrecioEnMiembro);
//#######################################################################################################//





//############### PROCESAMIENTO DEL AÑADIDO DE PRODUCTOS MAD AL CARRITO POR EL CLIENTE ##################//
const ingresoCarrito = require('../controladores/clientes/ingresar/alCarrito.js');

rutasPost.post('/sesion-cliente/:id/empieza/productosmadservices/carrito', ingresoCarrito);
//#######################################################################################################//





//##################### PROCESAMIENTO DE LA COMPRA DE PRODUCTOS MAD POR EL CLIENTE ######################//
const compraPagada = require('../controladores/clientes/pagar/pagar.js');

rutasPost.post('/sesion-cliente/:id/carrito/comprar/pagado', compraPagada);
//#######################################################################################################//





//################## PROCESAMIENTO DEL INGRESO DE LA TARJETA BANCARIA POR EL CLIENTE ####################//
const ingresarTarjetaBank = require('../controladores/clientes/ingresar/tarjetaBancaria.js');

rutasPost.post('/sesion-cliente/:id/perfil/ingresar-tarjeta', ingresarTarjetaBank);
//#######################################################################################################//





//########################################### PUNTO DE UNIÓN ############################################//
module.exports = rutasPost;
//#######################################################################################################//