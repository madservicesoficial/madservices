//-- Importamos las funciones de operaciones de los Clientes para interactuar con la base de datos.
const { editarCVVTarjetaBankdb } = require('../../modelos/clientes/operacionesDB.js');
//-- Importamos la Tecnología que crea los cuadros de alertas emergentes.
const alerta = require('alert');

//-- Creamos el Punto de Control para configurar la actualización de la tarjeta bancaria del cliente.
const editarCVVTarjetaBank = (req, res) => {

    //-- Obtenemos el parámetro del ID cliente.
    let id = req.params.id;
    //-- Obtenemos las ctes que confirman la actualización o no la tarjeta bancaria.
    const cvv = req.body.cvv;
    //-- Proceso de actualizar la tarjeta bancaria.
    if(cvv) {
        editarCVVTarjetaBankdb(id, cvv, res);
    }else {
        //-- Mostrar alerta.
        alerta('No ha habido cambios en la tarjeta bancaria');
        //-- Redirigir.
        return res.redirect(`/sesion-cliente/${id}/perfil`);
    }
}

//-- Exportamos la configuración para unificarlo con el resto de rutas.
module.exports = editarCVVTarjetaBank;