//-- Importamos las funciones de operaciones de Clientes para interactuar con la base de datos.
const {adquirirNombredb, guardaTarjetadb, confirmacionCompradb} = require('../../modelos/clientes/operacionesDB.js');
//-- Importamos la Tecnología que crea los cuadros de alertas emergentes.
const alerta = require('alert');

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
    if(nohayTarjeta) {
        //-- Comprobamos si quiere o no guardar la tarjeta en base de datos.
        const guardarTarjeta = req.body.saveCard;
        if(!nombreTarjeta) {
            //-- Se adquiere el nombre del cliente de la base de datos.
            nombreTarjeta = await adquirirNombredb(id);
        }
        if(!numTarjeta || !expiracion || !cvv) {
            //-- Campos vacíos.
            alerta('Campos vacíos');
            return res.redirect(`/sesion-cliente/${id}/carrito/comprar`);
        }else {
            if(guardarTarjeta) {
                if(numTarjeta <= 16) {
                    //-- Guardamos la tarjeta en base de datos.
                    const newExpiracion = expiracion + '-01';
                    guardaTarjetadb(id, nombreTarjeta, numTarjeta, newExpiracion, cvv);
                }else {
                    //-- Mostrar alerta y redirigir al mismo lugar.
                    alerta('Nº de tarjeta demasiado largo');
                    res.redirect(`/sesion-cliente/${id}/carrito/comprar`);
                }
            }
        }
    }
    //-- Se confirma la compra.
    /* confirmacionCompradb(id);
    alerta('Producto comprado con éxito');
    res.redirect(`/sesion-cliente/${id}/perfil`); */
}

//-- Exportamos para unir con el resto de rutas.
module.exports = compraPagada;