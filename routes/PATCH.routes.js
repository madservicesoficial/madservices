//############################ PARTE GENERAL DE LAS RUTAS DE ACTUALIZACIÓN ##############################//
//-- Importamos la Tecnología Express para crear el servidor de MAD Services basado en Express.
var servidor = require('express');
//-- Importamos el Componente de Express que enrruta las paginas de MAD Services.
var rutasPatch = servidor.Router();
//-- Importamos la Tecnología para almacenar las imágenes introducidas.
const multer = require('multer');
//#######################################################################################################//





//############################ ACTUALIZACIÓN DE DATOS EN EL PERFIL CLIENTE ##############################//
const actualizarNombre = require('../controladores/clientes/actualizar/perfil/nombre.js');
const actualizarApellidos = require('../controladores/clientes/actualizar/perfil/apellidos.js');
const actualizarGeneroCliente = require('../controladores/clientes/actualizar/perfil/genero.js');
const actualizarEmailCliente = require('../controladores/clientes/actualizar/perfil/email.js');
const actualizarPasswordCliente = require('../controladores/clientes/actualizar/perfil/password.js');
const actualizarLocalizacion = require('../controladores/clientes/actualizar/perfil/localizacion.js');

rutasPatch.post('/sesion-cliente/:id/perfil/actualizar-nombre', actualizarNombre);
rutasPatch.post('/sesion-cliente/:id/perfil/actualizar-apellidos', actualizarApellidos);
rutasPatch.post('/sesion-cliente/:id/perfil/actualizar-genero', actualizarGeneroCliente);
rutasPatch.post('/sesion-cliente/:id/perfil/actualizar-email', actualizarEmailCliente);
rutasPatch.post('/sesion-cliente/:id/perfil/actualizar-password', actualizarPasswordCliente);
rutasPatch.post('/sesion-cliente/:id/perfil/actualizar-localizacion', actualizarLocalizacion);
//#######################################################################################################//





//########################### ACTUALIZACIÓN DE DATOS EN LA INTERFAZ EMPRESA #############################//
const actualizarMarca = require('../controladores/empresas/actualizar/interfaz/marca.js');
const actualizarTipo = require('../controladores/empresas/actualizar/interfaz/categoria.js');
const actualizarCIF = require('../controladores/empresas/actualizar/interfaz/cif.js');
const actualizarEmailEmpresa = require('../controladores/empresas/actualizar/interfaz/email.js');
const actualizarPasswordEmpresa = require('../controladores/empresas/actualizar/interfaz/password.js');

rutasPatch.post('/sesion-empresa/:id/interfaz/actualizar-marca', actualizarMarca);
rutasPatch.post('/sesion-empresa/:id/interfaz/actualizar-tipo', actualizarTipo);
rutasPatch.post('/sesion-empresa/:id/interfaz/actualizar-nif', actualizarCIF);
rutasPatch.post('/sesion-empresa/:id/interfaz/actualizar-email', actualizarEmailEmpresa);
rutasPatch.post('/sesion-empresa/:id/interfaz/actualizar-password', actualizarPasswordEmpresa);
//#######################################################################################################//





//######################### ACTUALIZACIÓN DE DATOS EN LA INTERFAZ MIEMBRO MAD ###########################//
const actualizarMiembro = require('../controladores/miembros/actualizar/interfaz/miembro.js');
const actualizarDepartamento = require('../controladores/miembros/actualizar/interfaz/departamento.js');
const actualizarGenero = require('../controladores/miembros/actualizar/interfaz/genero.js');
const actualizarEmail = require('../controladores/miembros/actualizar/interfaz/email.js');
const actualizarPassword = require('../controladores/miembros/actualizar/interfaz/password.js');

rutasPatch.post('/sesion-miembro/:id/interfaz/actualizar-miembro', actualizarMiembro);
rutasPatch.post('/sesion-miembro/:id/interfaz/actualizar-departamento', actualizarDepartamento);
rutasPatch.post('/sesion-miembro/:id/interfaz/actualizar-genero', actualizarGenero);
rutasPatch.post('/sesion-miembro/:id/interfaz/actualizar-email', actualizarEmail);
rutasPatch.post('/sesion-miembro/:id/interfaz/actualizar-password', actualizarPassword);
//#######################################################################################################//





//################################# ACTUALIZACIÓN DE LOS PRODUCTOS MAD ##################################//
const actualizarImagen = require('../controladores/miembros/actualizar/productos/imagen.js');
const actualizarCantidad = require('../controladores/miembros/actualizar/productos/cantidad.js');
const actualizarCategoria = require('../controladores/miembros/actualizar/productos/categoria.js');
const actualizarTitulo = require('../controladores/miembros/actualizar/productos/titulo.js');
const actualizarPrecio = require('../controladores/miembros/actualizar/productos/precio.js');
const actualizarPeso = require('../controladores/miembros/actualizar/productos/peso.js');
const actualizarDescripcion = require('../controladores/miembros/actualizar/productos/descripcion.js');

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
rutasPatch.post('/sesion-miembro/:id/empieza/productosmadservices/edicion:enumeracion-imagen', upload.single('portada'), actualizarImagen);
rutasPatch.post('/sesion-miembro/:id/empieza/productosmadservices/edicion:enumeracion-cantidad', actualizarCantidad);
rutasPatch.post('/sesion-miembro/:id/empieza/productosmadservices/edicion:enumeracion-categoria', actualizarCategoria);
rutasPatch.post('/sesion-miembro/:id/empieza/productosmadservices/edicion:enumeracion-titulo', actualizarTitulo);
rutasPatch.post('/sesion-miembro/:id/empieza/productosmadservices/edicion:enumeracion-precio', actualizarPrecio);
rutasPatch.post('/sesion-miembro/:id/empieza/productosmadservices/edicion:enumeracion-peso', actualizarPeso);
rutasPatch.post('/sesion-miembro/:id/empieza/productosmadservices/edicion:enumeracion-descripcion', actualizarDescripcion);
//#######################################################################################################//





//########################## ACTUALIZACIÓN DE LA TARJETA BANCARIA DEL CLIENTE ###########################//
const editarNumTarjetaBank = require('../controladores/clientes/actualizar/tarjeta/identificativo.js');
const editarValidezTarjetaBank = require('../controladores/clientes/actualizar/tarjeta/validez.js');
const editarNombreTarjetaBank = require('../controladores/clientes/actualizar/tarjeta/persona.js');
const editarCVVTarjetaBank = require('../controladores/clientes/actualizar/tarjeta/cvv.js');

rutasPatch.post('/sesion-cliente/:id/perfil/editar-numero', editarNumTarjetaBank);
rutasPatch.post('/sesion-cliente/:id/perfil/editar-validez', editarValidezTarjetaBank);
rutasPatch.post('/sesion-cliente/:id/perfil/editar-nombre', editarNombreTarjetaBank);
rutasPatch.post('/sesion-cliente/:id/perfil/editar-cvv', editarCVVTarjetaBank);
//#######################################################################################################//





//########################################### PUNTO DE UNIÓN ############################################//
module.exports = rutasPatch;
//#######################################################################################################//