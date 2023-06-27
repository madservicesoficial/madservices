//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología para sacar la alerta/notificación.
const notifier = require('node-notifier');
//-- Importamos la Tecnología para encaminar a archivo a usar.
const path = require('path');
//#######################################################################################################//

//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { consultaProductosMADdb, consultaCarritodb, consultaCantidadEnCarritodb, ingresoCarritodb, actualizaCarritodb } = require('../../../modelos/clientes/ingresar/ingresar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const ingresoCarrito = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
    let enumeracion = req.body.enumeracion;
    let numProducto = parseInt(enumeracion, 10);
    //-- Llamada a función.
    consultaProductosMADdb
    (
        numProducto,
        (resultados) => {
            let cantidad = parseInt(resultados.cantidad, 10);
            let titulo = resultados.titulo;
            let precio = parseFloat(resultados.precio, 10);
            //-- Llamar a la función.
            consultaCarritodb
            (
                id, titulo,
                (hayProductoEnCarrito) => {
                    if(hayProductoEnCarrito === 0) {
                        //-- Llamar a la función.
                        ingresoCarritodb(id, titulo, precio);
                        notifier.notify(
                            {
                                sound: true,
                                wait: true,
                                title: '¡Añadido!',
                                message: 'Producto añadido al carrito',
                                icon: path.join(__dirname, '../../../public/images/correcto.png')
                            }
                        );
                        res.status(201);
                        res.redirect(`/sesion-cliente/${id}/productosmadservices`);
                        return res.end();
                    }else {
                        //-- Llamar a la función.
                        consultaCantidadEnCarritodb
                        (
                            id, titulo,
                            (productos) => {
                                if(cantidad === productos.cantidad) {
                                    notifier.notify(
                                        {
                                            sound: true,
                                            wait: true,
                                            title: '¡Atención!',
                                            message: 'No hay más productos que añadir',
                                            icon: path.join(__dirname, '../../../public/images/incorrecto.png')
                                        }
                                    );
                                    res.status(401);
                                    res.redirect(`/sesion-cliente/${id}/productosmadservices`);
                                    return res.end();
                                }else {
                                    let insertar = parseInt(productos.cantidad, 10);
                                    let precioFinal = precio + parseFloat(productos.precio, 10);
                                    //-- Llamar a la función.
                                    actualizaCarritodb(insertar, precioFinal, titulo, id);
                                    notifier.notify(
                                        {
                                            sound: true,
                                            wait: true,
                                            title: '¡Añadido!',
                                            message: `${insertar+1}º producto de ${titulo} añadido al carrito`,
                                            icon: path.join(__dirname, '../../../public/images/correcto.png')
                                        }
                                    );
                                    res.status(201);
                                    res.redirect(`/sesion-cliente/${id}/productosmadservices`);
                                    return res.end();
                                }
                            }
                        );
                    }
                }
            );
        }
    );
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = ingresoCarrito;
//#######################################################################################################//