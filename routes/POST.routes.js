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
//-- Formulario de envío de datos del CV.
rutasPost.post('/empleo');
//-- Formulario de envío de datos del CV para clientes.
rutasPost.post('/sesion-cliente/:id/empleo');
//-- Formulario de envío de datos del CV para empresas.
rutasPost.post('/sesion-empresa/:id/empleo');
//-- Formulario de envío de datos del CV para miembros MAD.
rutasPost.post('/sesion-miembro/:id/empleo');

//-- Exportamos las rutas con método POST.
module.exports = rutasPost;