//-- Importamos la Tecnología Express para crear el servidor de MAD Services basado en Express.
var servidor = require('express');
//-- Importamos el Componente de Express que enrruta las paginas de MAD Services.
var rutasPost = servidor.Router();
//-- Importamos el Controlador del Registro de los Clientes.
const registroClientes = require('../controladores/clientes/registrarse.js');
//-- Importamos el Controlador del Registro de las Empresas.
const registroEmpresas = require('../controladores/empresas/registrarse.js');
//-- Importamos el Controlador del Registro de los Miembros MAD.
const registroMiembros = require('../controladores/miembros/registrarse.js');
//-- Importamos el Controlador del Inicio de Sesión de los Clientes.
const iniciarSesionClientes = require('../controladores/clientes/iniciarSesion.js');
//-- Importamos el Controlador del Inicio de Sesión de las Empresas.
const iniciarSesionEmpresas = require('../controladores/empresas/iniciarSesion.js');
//-- Importamos el Controlador del Inicio de Sesión de los Miembros MAD.
const iniciarSesionMiembros = require('../controladores/miembros/iniciarSesion.js');
//-- Importamos la función para autorizar como Miembro MAD para Registro.
const autorizacionRegistroMiembros = require('../controladores/miembros/autorizacionRegistro.js');
//-- Importamos la función para autorizar como Miembro MAD para Login.
const autorizacionInicioSesionMiembros = require('../controladores/miembros/autorizacionInicioSesion.js');
//-- Importamos la función para ingresar productos MAD en la base de datos.
const ingresoProductosMAD = require('../controladores/miembros/ingresoProductosMAD.js');
//-- Importamos la Tecnología para almacenar las imágenes introducidas.
const multer = require('multer');
//-- Importamos la función para el ingreso de sitios de la interfaz de la Empresa.
const ingresoDescripcionEmpresa = require('../controladores/empresas/ingresoDescripcionEmpresa.js');
const ingresoWhatsAppEmpresa = require('../controladores/empresas/ingresoWhatsAppEmpresa.js');
const ingresoInstagramEmpresa = require('../controladores/empresas/ingresoInstagramEmpresa.js');
const ingresoTwitterEmpresa = require('../controladores/empresas/ingresoTwitterEmpresa.js');
const ingresoPagWebEmpresa = require('../controladores/empresas/ingresoPagWebEmpresa.js');
//-- Importamos la función para el borrado de sitios de la interfaz de la Empresa.
const borrarDescripcionEmpresa = require('../controladores/empresas/borrarDescripcionEmpresa.js');
const borrarWhatsAppEmpresa = require('../controladores/empresas/borrarWhatsAppEmpresa.js');
const borrarInstagramEmpresa = require('../controladores/empresas/borrarInstagramEmpresa.js');
const borrarTwitterEmpresa = require('../controladores/empresas/borrarTwitterEmpresa.js');
const borrarPagWebEmpresa = require('../controladores/empresas/borrarPagWebEmpresa.js');
//-- Importamos las funciones de la configuración del filtro de búsqueda.
const busquedaPorTitulo = require('../controladores/general/busquedaPorTitulo.js');
const busquedaPorTituloEnCliente = require('../controladores/clientes/busquedaPorTituloEnCliente.js');
const busquedaPorTituloEnMiembro = require('../controladores/miembros/busquedaPorTituloEnMiembro.js');
const busquedaPorCategoria = require('../controladores/general/busquedaPorCategoria.js');
const busquedaPorCategoriaEnCliente = require('../controladores/clientes/busquedaPorCategoriaEnCliente.js');
const busquedaPorCategoriaEnMiembro = require('../controladores/miembros/busquedaPorCategoriaEnMiembro.js');
const busquedaPorPrecio = require('../controladores/general/busquedaPorPrecio.js');
const busquedaPorPrecioEnCliente = require('../controladores/clientes/busquedaPorPrecioEnCliente.js');
const busquedaPorPrecioEnMiembro = require('../controladores/miembros/busquedaPorPrecioEnMiembro.js');
//-- Importamos la función para ingresar al carrito de la compra.
const ingresoCarrito = require('../controladores/clientes/ingresoCarrito.js');
//-- Importamos la función que confirma la compra por parte del cliente.
const compraPagada = require('../controladores/clientes/compraPagada.js');
//-- Importamos la función que ingresa tarjetas bancarias en el perfil del cliente.
const ingresarTarjetaBank = require('../controladores/clientes/ingresarTarjetaBank.js');

//-- Formulario de envío de datos para Iniciar Sesión como Cliente.
rutasPost.post('/login/cliente', iniciarSesionClientes);
//-- Formulario de envío de datos para Iniciar Sesión como Empresa.
rutasPost.post('/login/empresa', iniciarSesionEmpresas);
//-- Formulario de autenticación como Miembro MAD para Login.
rutasPost.post('/login/autorizar', autorizacionInicioSesionMiembros);
//-- Formulario de envío de datos para Iniciar Sesión como Miembro MAD.
rutasPost.post('/login/autorizar/miembro', iniciarSesionMiembros);
//-- Formulario de envío de datos para Registrarse como Cliente.
rutasPost.post('/registrarse/cliente', registroClientes);
//-- Formulario de envío de datos para Registrarse como Empresa.
rutasPost.post('/registrarse/empresa', registroEmpresas);
//-- Formulario de autenticación como Miembro MAD para Registro.
rutasPost.post('/registrarse/autorizar', autorizacionRegistroMiembros);
//-- Formulario de envío de datos para Registrarse como Miembro MAD.
rutasPost.post('/registrarse/autorizar/miembro', registroMiembros);
//-- Formulario de ingreso de productos MAD.
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './imagenes');
    },
    filename: (req, file, callback) => {
        const extension = file.originalname.split('.').pop();
        callback(null, `${Date.now()}.${extension}`);
    }
});
const upload = multer({ storage: storage });
rutasPost.post('/sesion-miembro/:id/interfaz/nuevo-producto', upload.single('portada'), ingresoProductosMAD);
//-- Formulario ingresar en interfaz de empresa.
rutasPost.post('/sesion-empresa/:id/interfaz/add-descripcion', ingresoDescripcionEmpresa);
rutasPost.post('/sesion-empresa/:id/interfaz/add-url-WhatsApp', ingresoWhatsAppEmpresa);
rutasPost.post('/sesion-empresa/:id/interfaz/add-url-Instagram', ingresoInstagramEmpresa);
rutasPost.post('/sesion-empresa/:id/interfaz/add-url-Twitter', ingresoTwitterEmpresa);
rutasPost.post('/sesion-empresa/:id/interfaz/add-url-PagWeb', ingresoPagWebEmpresa);
//-- Formulario eliminar en interfaz de empresa.
rutasPost.post('/sesion-empresa/:id/interfaz/borrar-descripcion', borrarDescripcionEmpresa);
rutasPost.post('/sesion-empresa/:id/interfaz/borrar-url-WhatsApp', borrarWhatsAppEmpresa);
rutasPost.post('/sesion-empresa/:id/interfaz/borrar-url-Instagram', borrarInstagramEmpresa);
rutasPost.post('/sesion-empresa/:id/interfaz/borrar-url-Twitter', borrarTwitterEmpresa);
rutasPost.post('/sesion-empresa/:id/interfaz/borrar-url-PagWeb', borrarPagWebEmpresa);
//-- Formulario que hace búsqueda del producto MAD por título.
rutasPost.post('/empieza/productosmadservices/busqueda-titulo', busquedaPorTitulo);
rutasPost.post('/sesion-cliente/:id/empieza/productosmadservices/busqueda-titulo', busquedaPorTituloEnCliente);
rutasPost.post('/sesion-miembro/:id/empieza/productosmadservices/busqueda-titulo', busquedaPorTituloEnMiembro);
//-- Formulario que hace búsqueda del producto MAD por tipo de producto.
rutasPost.post('/empieza/productosmadservices/busqueda-categoria', busquedaPorCategoria);
rutasPost.post('/sesion-cliente/:id/empieza/productosmadservices/busqueda-categoria', busquedaPorCategoriaEnCliente);
rutasPost.post('/sesion-miembro/:id/empieza/productosmadservices/busqueda-categoria', busquedaPorCategoriaEnMiembro);
//-- Formulario que hace búsqueda del producto MAD por precio.
rutasPost.post('/empieza/productosmadservices/busqueda-precio', busquedaPorPrecio);
rutasPost.post('/sesion-cliente/:id/empieza/productosmadservices/busqueda-precio', busquedaPorPrecioEnCliente);
rutasPost.post('/sesion-miembro/:id/empieza/productosmadservices/busqueda-precio', busquedaPorPrecioEnMiembro);
//-- Formulario para añadir artículos al carrito de la compra.
rutasPost.post('/sesion-cliente/:id/empieza/productosmadservices/carrito', ingresoCarrito);
//-- Formulario para confirmar la compra por parte del cliente.
rutasPost.post('/sesion-cliente/:id/carrito/comprar/pagado', compraPagada);
//-- Formulario para ingresar tarjeta bancaria en el perfil del cliente.
rutasPost.post('/sesion-cliente/:id/perfil/ingresar-tarjeta', ingresarTarjetaBank);

//-- Exportamos las rutas con método POST.
module.exports = rutasPost;