//-- Importamos las funciones de operaciones de Clientes para interactuar con la base de datos.
const {adquirirNombredb, guardaTarjetadb, confirmacionCompradb, borrarCarritoSegunIDdb} = require('../../modelos/clientes/operacionesDB.js');
//-- Importamos la Tecnología que crea los cuadros de alertas emergentes.
const alerta = require('alert');
//-- Importamos la Tecnología para validar datos de la tarjeta bancaria del cliente.
const validarCard = require('card-validator');

//-- Pto de control del ajuste de la verificación de la compra.
const compraPagada = async (req, res) => {
    
    //-- Obtenemos el ID del Cliente.
    let id = req.params.id;
    //-- Obtenemos el resto de variables.
    let nombreTarjeta = req.body.nombreTarjeta;
    const numTarjeta = req.body.numeroTarjeta;
    let expiracion = req.body.fechaExpiracion;
    const cvv = req.body.cvv;
    let nohayTarjeta = req.body.nohayTarjeta;
    //-- Comprobamos si hay o no tarjeta guardada.
    if(nohayTarjeta) {
        if(!nombreTarjeta) {
            //-- Se adquiere el nombre del cliente de la base de datos.
            nombreTarjeta = await adquirirNombredb(id);
        }
        if(!numTarjeta || !expiracion || !cvv) {
            //-- Campos vacíos.
            alerta('Campos vacíos');
            return res.redirect(`/sesion-cliente/${id}/carrito/comprar`);
        }else {
            //-- Comprobamos si quiere o no guardar la tarjeta en base de datos.
            const guardarTarjeta = req.body.saveCard;
            //-- Configuramos bien la fecha de expiración.
            const newExpiracion = expiracion + '-01';
            //-- Validamos el nº de tarjeta bancaria y el cvv.
            const validacionCard = validarCard.number(numTarjeta);
            const validacionCVV = validarCard.cvv(cvv);
            if(nombreTarjeta > 148) {
                //-- Mostrar alerta y redirigir a donde estaba de nuevo.
                alerta(`${nombreTarjeta} demasiado largo`);
                return res.redirect(`/sesion-cliente/${id}/carrito/comprar`);
            }else if(!validacionCard.isValid || numTarjeta.length > 18) {
                //-- Mostrar alerta y redirigir a donde estaba de nuevo.
                alerta(`${numTarjeta} es un nº de tarjeta bancaria inválido`);
                return res.redirect(`/sesion-cliente/${id}/carrito/comprar`);
            }else if(!validacionCVV.isValid) {
                //-- Mostrar alerta y redirigir a donde estaba de nuevo.
                alerta(`${cvv} es un código CVV inválido`);
                return res.redirect(`/sesion-cliente/${id}/carrito/comprar`);
            }else {
                if(guardarTarjeta) {
                    //-- Guardamos la tarjeta en base de datos.
                    guardaTarjetadb(id, nombreTarjeta, numTarjeta, newExpiracion, cvv);
                }
                //-- Proceso de compra.
                let fallo = await confirmacionCompradb(id);
                if(fallo === true) {
                    //-- Mostrar alerta.
                    alerta('No puedes comprar más productos de los que hay');
                    //-- Redirigir.
                    return res.redirect(`/sesion-cliente/${id}/carrito/comprar`);
                }else {
                    //-- Borrar el carrito según el ID cliente que ha comprado.
                    borrarCarritoSegunIDdb(id);
                    //-- Mostrar alerta de que el producto o productos han sido comprados con éxito.
                    alerta('¡Compra realizada con éxito!');
                    //-- Redirigir al perfil del cliente.
                    return res.redirect(`/sesion-cliente/${id}/perfil`);
                }
            }
        }
    }else {
        //-- Proceso de compra.
        let fallo = await confirmacionCompradb(id);
        if(fallo === true) {
            //-- Mostrar alerta.
            alerta('No puedes comprar más productos de los que hay');
            //-- Redirigir.
            return res.redirect(`/sesion-cliente/${id}/carrito/comprar`);
        }else {
            //-- Borrar el carrito según el ID cliente que ha comprado.
            borrarCarritoSegunIDdb(id);
            //-- Mostrar alerta de que el producto o productos han sido comprados con éxito.
            alerta('¡Compra realizada con éxito!');
            //-- Redirigir al perfil del cliente.
            return res.redirect(`/sesion-cliente/${id}/perfil`);
        }
    }
}

//-- Exportamos para unir con el resto de rutas.
module.exports = compraPagada;