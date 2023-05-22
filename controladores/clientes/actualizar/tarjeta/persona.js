//-- Importamos las funciones de operaciones de los Clientes para interactuar con la base de datos.
const { editarNombreTarjetaBankdb } = require('../../modelos/clientes/operacionesDB.js');
//-- Importamos la Tecnología que crea los cuadros de alertas emergentes.
const alerta = require('alert');

//-- Creamos el Punto de Control para configurar la actualización de la tarjeta bancaria del cliente.
const editarNombreTarjetaBank = (req, res) => {

    //-- Obtenemos el parámetro del ID cliente.
    let id = req.params.id;
    //-- Obtenemos las ctes que confirman la actualización o no la tarjeta bancaria.
    const namecard = req.body.namecard;
    //-- Proceso de actualizar la tarjeta bancaria.
    if(namecard) {
        editarNombreTarjetaBankdb(id, namecard, res);
    }else {
        //-- Mostrar alerta.
        alerta('No ha habido cambios en la tarjeta bancaria');
        //-- Redirigir.
        return res.redirect(`/sesion-cliente/${id}/perfil`);
    }
}

//-- Exportamos la configuración para unificarlo con el resto de rutas.
module.exports = editarNombreTarjetaBank;