//-- Importamos las funciones de operaciones de Clientes para interactuar con la base de datos.
const {adquirirNombredb} = require('../../modelos/clientes/operacionesDB.js');
//-- Importamos la Tecnología que crea los cuadros de alertas emergentes.
const alerta = require('alert');

//-- Pto de control del ajuste de la verificación de la compra.
const compraPagada = async (req, res) => {
    
    //-- Obtenemos el ID del Cliente.
    let id = req.params.id;
    //-- Obtenemos el resto de variables.
    const nombreTarjeta = req.body.nombreTarjeta;
    const numTarjeta = req.body.numeroTarjeta;
    const expiracion = req.body.fechaExpiracion;
    const cvv = req.body.cvv;
    //-- Comprobamos si quiere o no guardar la tarjeta en base de datos.
    const guardarTarjeta = req.body.saveCard;
    if(!nombreTarjeta) {
        //-- Se adquiere el nombre del cliente de la base de datos.
        nombreTarjeta = await adquirirNombredb(id);
        console.log(nombreTarjeta);
    }else {
        console.log(nombreTarjeta);
    }
    alerta('Producto comprado con éxito');
    res.redirect(`/sesion-cliente/${id}/carrito/comprar`);
    /* if(!numTarjeta || !expiracion || !cvv) {
        //-- Campos vacíos.
        alerta('Campos vacíos');
        return res.redirect(`/sesion-cliente/${id}/carrito/comprar`);
    }else {
        if(guardarTarjeta) {
            //-- Guardamos la tarjeta en base de datos.
            guardaTarjetadb(id, nombreTarjeta, numTarjeta, expiracion, cvv);
        }
        //-- Se confirma la compra.
        confirmacionCompradb();
    } */
}

//-- Exportamos para unir con el resto de rutas.
module.exports = compraPagada;