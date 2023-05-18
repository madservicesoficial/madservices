//-- Importamos las funciones de operaciones de los Clientes para interactuar con la base de datos.
const { borrarTarjetaBankdb } = require('../../modelos/clientes/operacionesDB.js');
//-- Importamos la Tecnología que crea los cuadros de alertas emergentes.
const alerta = require('alert');

//-- Creamos el Punto de Control para configurar el borrado de la tarjeta bancaria del cliente.
const borrarTarjetaBank = (req, res) => {

    //-- Obtenemos el parámetro del ID cliente.
    let id = req.params.id;
    //-- Obtenemos las ctes que confirman si se borra o no la tarjeta bancaria.
    const borraCard = req.body.borraCard;
    //-- Proceso de borrar la tarjeta bancaria.
    if(borraCard) {
        borrarTarjetaBankdb(id, res);
    }else {
        //-- Mostrar alerta.
        alerta('No ha habido cambios en la tarjeta bancaria');
        //-- Redirigir.
        return res.redirect(`/sesion-cliente/${id}/perfil`);
    }
}

//-- Exportamos la configuración para unificarlo con el resto de rutas.
module.exports = borrarTarjetaBank;