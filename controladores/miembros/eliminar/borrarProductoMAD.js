//-- Importamos las funciones de operaciones de los Miembros MAD para interactuar con la base de datos.
const { borrarProductoMADdb, consultarEnumeracionAndActualizardb, actualizarEnumeraciondb, salidaProductoBorrado } = require('../../modelos/miembros/operacionesDB.js');

//-- Creamos el Punto de Control para configurar la eliminación de un producto MAD.
const borrarProductoMAD = (req, res) => {

    //-- Obtenemos el parámetro del ID Miembro MAD.
    let id = req.params.id;
    const enumeracion = req.body.enumeracion;
    //-- Declaramos la variable entera del punto de partida.
    const ptoPartida = parseInt(enumeracion, 10);
    //-- Borramos el producto MAD de la base de datos.
    borrarProductoMADdb(ptoPartida);
    //-- Ajustamos la enumeración después de borrar.
    let enumeracionSig = ptoPartida + 1;
    //-- Consultamos la enumeración del Producto MAD.
    consultarEnumeracionAndActualizardb(enumeracionSig);
    //-- Salida con alerta.
    salidaProductoBorrado(id, res);
}

//-- Exportamos la configuración de la eliminación de un producto MAD para unificarlo con el resto de rutas.
module.exports = borrarProductoMAD;