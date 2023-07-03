//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const {madservicesAdmindb} = require('../../../config/database.js');
//-- Importamos la Tecnología para sacar la alerta/notificación.
const notifier = require('node-notifier');
//-- Importamos la Tecnología para encaminar a archivo a usar.
const path = require('path');

//-- Creamos la función para Dar de Baja al Miembro MAD de la base de datos de MAD Services.
const darseBajaMiembrodb = (id) => {

    let instruccionDarDeBajaMiembro = 'DELETE FROM miembros WHERE id = ?';
    let formatoinstruccionDarDeBajaMiembro = mysql.format(instruccionDarDeBajaMiembro, [id]);
    madservicesAdmindb.query(formatoinstruccionDarDeBajaMiembro);
}

//-- Creamos la función para borrar el producto MAD de la base de datos de MAD Services.
const borrarProductoMADdb = (ptoPartida) => {

    //-- Consultamos los productos MAD en la base de datos.
    let instruccionConsultarProductoMAD = 'SELECT * FROM productos WHERE enumeracion = ?';
    let formatoInstruccionConsultarProductoMAD = mysql.format(instruccionConsultarProductoMAD, [ptoPartida]);
    madservicesAdmindb.query(formatoInstruccionConsultarProductoMAD, (error, results) => {
        if(error) throw error;
        const titulo = results[0].titulo;
        let instruccionConsultar = 'SELECT * FROM carrito WHERE titulo = ?';
        let formatoInstruccionConsultar = mysql.format(instruccionConsultar, [titulo]);
        madservicesAdmindb.query(formatoInstruccionConsultar, (error, results2) => {
            if(error) throw error;
            if(results2.length > 0) {
                let instruccionBorrarProductoDeCarrito = 'DELETE FROM carrito WHERE titulo = ?';
                let formatoInstruccionBorrarProductoDeCarrito = mysql.format(instruccionBorrarProductoDeCarrito, [titulo]);
                madservicesAdmindb.query(formatoInstruccionBorrarProductoDeCarrito);
            }
        });
        //-- Borramos el producto MAD de la base de datos.
        let instruccionBorrarProductoMAD = 'DELETE FROM productos WHERE enumeracion = ?';
        let formatoInstruccionBorrarProductoMAD = mysql.format(instruccionBorrarProductoMAD, [ptoPartida]);
        madservicesAdmindb.query(formatoInstruccionBorrarProductoMAD);
    });
}

//-- Creamos la función para consultar la enumeración del producto MAD de la base de datos de MAD Services.
const consultarEnumeracionAndActualizardb = (enumeracionSig) => {

    let instruccionConsultarProductoMAD = 'SELECT * FROM productos WHERE enumeracion = ?';
    let formatoInstruccionConsultarProductoMAD = mysql.format(instruccionConsultarProductoMAD, [enumeracionSig]);
    madservicesAdmindb.query(formatoInstruccionConsultarProductoMAD, (error, salida) => {
        if(error) throw error;
        if(salida.length > 0) {
            let enumeracionAnt = enumeracionSig - 1;
            let instruccionCambioEnumeracion = 'UPDATE productos SET enumeracion = ? WHERE enumeracion = ?';
            let formatoInstruccionCambioEnumeracion = mysql.format(instruccionCambioEnumeracion, [enumeracionAnt, enumeracionSig]);
            madservicesAdmindb.query(formatoInstruccionCambioEnumeracion);
            enumeracionSig = enumeracionSig + 1;
            //-- Llamamos de nuevo a la función.
            consultarEnumeracionAndActualizardb(enumeracionSig);
        }
    });
}

//-- Creamos la función para borrar los archivos multimedia MAD de la base de datos.
const borrarArchivosMultimediaMADdb = (id, enumeracion, res) => {

    let instruccionBorrarMultimediadb = 'SELECT * FROM multimedia WHERE enumeracion = ?';
    let formatoInstruccionBorrarMultimediadb = mysql.format(instruccionBorrarMultimediadb, [enumeracion]);
    madservicesAdmindb.query(formatoInstruccionBorrarMultimediadb, (error, results) => {
        if(error) throw error;
        if(results.length === 0) {
            notifier.notify(
                {
                    sound: true,
                    wait: true,
                    title: '¡Error al eliminar!',
                    message: 'Sólo queda por borrar la imagen de portada o la 1',
                    icon: path.join(__dirname, '../../../public/images/incorrecto.png')
                }
            );
        }else {
            let instruccionBorrarImagenAimagen = 'DELETE FROM multimedia WHERE enumeracion = ?';
            let instruccionCambioAnuloUno = 'UPDATE multimedia SET ';
            let instruccionCambioAnuloDos = ' = NULL WHERE enumeracion = ?'
            if(results[0].filenueve !== null) {
                let solicitudDelBorradoImagenes = instruccionCambioAnuloUno + 'filenueve' + instruccionCambioAnuloDos;
                let formatoSolicitudDelBorradoImagenes = mysql.format(solicitudDelBorradoImagenes, [enumeracion]);
                madservicesAdmindb.query(formatoSolicitudDelBorradoImagenes);
                notifier.notify(
                    {
                        sound: true,
                        wait: true,
                        title: '¡Quitando imágenes!',
                        message: 'Imagen 10 borrada',
                        icon: path.join(__dirname, '../../../public/images/correcto.png')
                    }
                );
            }else if(results[0].fileocho !== null) {
                let solicitudDelBorradoImagenes = instruccionCambioAnuloUno + 'fileocho' + instruccionCambioAnuloDos;
                let formatoSolicitudDelBorradoImagenes = mysql.format(solicitudDelBorradoImagenes, [enumeracion]);
                madservicesAdmindb.query(formatoSolicitudDelBorradoImagenes);
                notifier.notify(
                    {
                        sound: true,
                        wait: true,
                        title: '¡Quitando imágenes!',
                        message: 'Imagen 9 borrada',
                        icon: path.join(__dirname, '../../../public/images/correcto.png')
                    }
                );
            }else if(results[0].filesiete !== null) {
                let solicitudDelBorradoImagenes = instruccionCambioAnuloUno + 'filesiete' + instruccionCambioAnuloDos;
                let formatoSolicitudDelBorradoImagenes = mysql.format(solicitudDelBorradoImagenes, [enumeracion]);
                madservicesAdmindb.query(formatoSolicitudDelBorradoImagenes);
                notifier.notify(
                    {
                        sound: true,
                        wait: true,
                        title: '¡Quitando imágenes!',
                        message: 'Imagen 8 borrada',
                        icon: path.join(__dirname, '../../../public/images/correcto.png')
                    }
                );
            }else if(results[0].fileseis !== null) {
                let solicitudDelBorradoImagenes = instruccionCambioAnuloUno + 'fileseis' + instruccionCambioAnuloDos;
                let formatoSolicitudDelBorradoImagenes = mysql.format(solicitudDelBorradoImagenes, [enumeracion]);
                madservicesAdmindb.query(formatoSolicitudDelBorradoImagenes);
                notifier.notify(
                    {
                        sound: true,
                        wait: true,
                        title: '¡Quitando imágenes!',
                        message: 'Imagen 7 borrada',
                        icon: path.join(__dirname, '../../../public/images/correcto.png')
                    }
                );
            }else if(results[0].filecinco !== null) {
                let solicitudDelBorradoImagenes = instruccionCambioAnuloUno + 'filecinco' + instruccionCambioAnuloDos;
                let formatoSolicitudDelBorradoImagenes = mysql.format(solicitudDelBorradoImagenes, [enumeracion]);
                madservicesAdmindb.query(formatoSolicitudDelBorradoImagenes);
                notifier.notify(
                    {
                        sound: true,
                        wait: true,
                        title: '¡Quitando imágenes!',
                        message: 'Imagen 6 borrada',
                        icon: path.join(__dirname, '../../../public/images/correcto.png')
                    }
                );
            }else if(results[0].filecuatro !== null) {
                let solicitudDelBorradoImagenes = instruccionCambioAnuloUno + 'filecuatro' + instruccionCambioAnuloDos;
                let formatoSolicitudDelBorradoImagenes = mysql.format(solicitudDelBorradoImagenes, [enumeracion]);
                madservicesAdmindb.query(formatoSolicitudDelBorradoImagenes);
                notifier.notify(
                    {
                        sound: true,
                        wait: true,
                        title: '¡Quitando imágenes!',
                        message: 'Imagen 5 borrada',
                        icon: path.join(__dirname, '../../../public/images/correcto.png')
                    }
                );
            }else if(results[0].filetres !== null) {
                let solicitudDelBorradoImagenes = instruccionCambioAnuloUno + 'filetres' + instruccionCambioAnuloDos;
                let formatoSolicitudDelBorradoImagenes = mysql.format(solicitudDelBorradoImagenes, [enumeracion]);
                madservicesAdmindb.query(formatoSolicitudDelBorradoImagenes);
                notifier.notify(
                    {
                        sound: true,
                        wait: true,
                        title: '¡Quitando imágenes!',
                        message: 'Imagen 4 borrada',
                        icon: path.join(__dirname, '../../../public/images/correcto.png')
                    }
                );
            }else if(results[0].filedos !== null) {
                let solicitudDelBorradoImagenes = instruccionCambioAnuloUno + 'filedos' + instruccionCambioAnuloDos;
                let formatoSolicitudDelBorradoImagenes = mysql.format(solicitudDelBorradoImagenes, [enumeracion]);
                madservicesAdmindb.query(formatoSolicitudDelBorradoImagenes);
                notifier.notify(
                    {
                        sound: true,
                        wait: true,
                        title: '¡Quitando imágenes!',
                        message: 'Imagen 3 borrada',
                        icon: path.join(__dirname, '../../../public/images/correcto.png')
                    }
                );
            }else {
                let formatoSolicitudDelBorradoImagenes = mysql.format(instruccionBorrarImagenAimagen, [enumeracion]);
                madservicesAdmindb.query(formatoSolicitudDelBorradoImagenes);
                notifier.notify(
                    {
                        sound: true,
                        wait: true,
                        title: '¡Quitando imágenes!',
                        message: 'Imagen 2 borrada',
                        icon: path.join(__dirname, '../../../public/images/correcto.png')
                    }
                );
            }
        }
        res.status(201);
        res.redirect(`/sesion-miembro/${id}/productosmadservices/expandir${enumeracion}`);
        return res.end();
    });
}

//-- Creamos la función para listar todos los clientes de la base de datos.
const listaTodosClientesdb = (email, idcliente, callback) => {

    let instruccionConsultar = "SELECT * FROM clientes";
    let formatoInstruccionConsultar = mysql.format(instruccionConsultar);
    madservicesAdmindb.query(formatoInstruccionConsultar, (error, results) => {
        if(error) throw error;
        let confirmacion = false;
        let idclienteINT = parseInt(idcliente, 10);
        for(let i=0; i<results.length; i++) {
            if(email === results[i].email && idclienteINT === results[i].id) {
                confirmacion = true;
                i = results.length + 1;
            }else {
                confirmacion = false;
            }
        }
        callback(confirmacion);
    });
}

//-- Creamos la función para Dar de Baja al Cliente por parte de un Miembro MAD.
const bajaClientePorMiembrodb = (idcliente) => {

    //-- Eliminar productos del cliente que tenga en el carrito.
    let instruccionVerCarrito = "SELECT * FROM carrito WHERE id = ?";
    let formatoInstruccionVerCarrito = mysql.format(instruccionVerCarrito, [idcliente]);
    madservicesAdmindb.query(formatoInstruccionVerCarrito, (error, results1) => {
        if(error) throw error;
        if(results1.length > 0) {
            let instruccionDarseBajaCarrito = "DELETE FROM carrito WHERE id = ?";
            let formatoInstruccionDarseBajaCarrito = mysql.format(instruccionDarseBajaCarrito, [idcliente]);
            madservicesAdmindb.query(formatoInstruccionDarseBajaCarrito);
        }
    });
    //-- Eliminar la tarjeta bancaria del cliente que tenga en la base de datos.
    let instruccionVerTarjetasBank = "SELECT * FROM tarjeta WHERE id = ?";
    let formatoInstruccionVerTarjetasBank = mysql.format(instruccionVerTarjetasBank, [idcliente]);
    madservicesAdmindb.query(formatoInstruccionVerTarjetasBank, (error, results2) => {
        if(error) throw error;
        if(results2.length > 0) {
            let instruccionBorrarTarjetasBank = "DELETE FROM tarjeta WHERE id = ?";
            let formatoInstruccionBorrarTarjetasBank = mysql.format(instruccionBorrarTarjetasBank, [idcliente]);
            madservicesAdmindb.query(formatoInstruccionBorrarTarjetasBank);
        }
    });
    //-- Eliminar cliente definitivamente.
    let instruccionDarseBajaCliente = "DELETE FROM clientes WHERE id = ?";
    let formatoinstruccionDarseBajaCliente = mysql.format(instruccionDarseBajaCliente, [idcliente]);
    madservicesAdmindb.query(formatoinstruccionDarseBajaCliente);
}

const listaTodasEmpresasdb = (email, cif, idEmpresa, callback) => {

    let instruccionConsultar = "SELECT * FROM empresas";
    let formatoInstruccionConsultar = mysql.format(instruccionConsultar);
    madservicesAdmindb.query(formatoInstruccionConsultar, (error, results) => {
        if(error) throw error;
        let confirmacion = false;
        let idEmpresaINT = parseInt(idEmpresa, 10);
        for(let i=0; i<results.length; i++) {
            if(email === results[i].email && idEmpresaINT === results[i].id && cif === results[i].nif) {
                confirmacion = true;
                i = results.length + 1;
            }else {
                confirmacion = false;
            }
        }
        callback(confirmacion);
    });
}

//-- Creamos la función para Dar de Baja a la Empresa por parte de un Miembro MAD.
const bajaEmpresaPorMiembrodb = (idEmpresa) => {

    let instruccionDarseBajaEmpresa = "DELETE FROM empresas WHERE id = ?";
    let formatoinstruccionDarseBajaEmpresa = mysql.format(instruccionDarseBajaEmpresa, [idEmpresa]);
    madservicesAdmindb.query(formatoinstruccionDarseBajaEmpresa);
}

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = {
    darseBajaMiembrodb,
    borrarProductoMADdb,
    consultarEnumeracionAndActualizardb,
    borrarArchivosMultimediaMADdb,
    listaTodosClientesdb,
    bajaClientePorMiembrodb,
    listaTodasEmpresasdb,
    bajaEmpresaPorMiembrodb
};
//#######################################################################################################//