//############################ PARTE GENERAL DE LAS RUTAS DE PROCESAMIENTO ##############################//
//-- Importamos la Tecnología Express para crear el servidor de MAD Services basado en Express.
const servidor = require('express');
//-- Importamos el Componente de Express que enrruta las paginas de MAD Services.
const rutasPost = servidor.Router();
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
rutasPost.post('/sesion-miembro/:id/productosmadservices/expandir:enumeracion/add-multimedia', cargas.single('multimedia'), ingresarArchivosMultimediaMAD);
//#######################################################################################################//





//################################ PROCESAMIENTO DEL FILTRO DE BÚSQUEDA #################################//
const filtroBusquedaMAD = require('../controladores/general/buscar/filtroBusquedamad.js');
const filtroBusquedaMADCliente = require('../controladores/clientes/buscar/filtroBusquedamad.js');
const filtroBusquedaMADMiembro = require('../controladores/miembros/buscar/filtroBusquedamad.js');
const filtroBusqueda = require('../controladores/general/buscar/filtroBusqueda.js');
const filtroBusquedaCliente = require('../controladores/clientes/buscar/filtroBusqueda.js');
const filtroBusquedaEmpresa = require('../controladores/empresas/buscar/filtroBusqueda.js');
const filtroBusquedaMiembro = require('../controladores/miembros/buscar/filtroBusqueda.js');

rutasPost.post('/productosmadservices/buscar', filtroBusquedaMAD);
rutasPost.post('/sesion-cliente/:id/productosmadservices/buscar', filtroBusquedaMADCliente);
rutasPost.post('/sesion-miembro/:id/productosmadservices/buscar', filtroBusquedaMADMiembro);
rutasPost.post('/themall/buscar', filtroBusqueda);
rutasPost.post('/sesion-cliente/:id/themall/buscar', filtroBusquedaCliente);
rutasPost.post('/sesion-empresa/:id/themall/buscar', filtroBusquedaEmpresa);
rutasPost.post('/sesion-miembro/:id/themall/buscar', filtroBusquedaMiembro);
//#######################################################################################################//





//############### PROCESAMIENTO DEL AÑADIDO DE PRODUCTOS MAD AL CARRITO POR EL CLIENTE ##################//
const ingresoCarrito = require('../controladores/clientes/ingresar/alCarrito.js');

rutasPost.post('/sesion-cliente/:id/productosmadservices/carrito', ingresoCarrito);
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