//-- Importamos las funciones de operaciones de los Miembros MAD para interactuar con la base de datos.
const { borrarProductoMADdb, consultardb } = require('../../modelos/miembros/operacionesDB.js');

//-- Creamos el Punto de Control para configurar la eliminación de un producto MAD.
const borrarProductoMAD = (req, res) => {

    //-- Obtenemos el parámetro del ID Miembro MAD.
    let id = req.params.id;
    const enumeracion = req.body.enumeracion;
    //-- Declaramos la variable entera del punto de partida.
    const ptoPartida = parseInt(enumeracion, 10);
    //-- Incrementamos al siguiente la variable de enumeración.
    let auxiliar = ptoPartida;
    auxiliar = auxiliar + 2;
    //-- Borramos el producto MAD de la base de datos.
    borrarProductoMADdb(ptoPartida);
    //-- Realizamos el bucle para ajustar la enumeración después de borrar.
    for(let i = auxiliar; i > ptoPartida; i++) {

    }
    //-- Mostrar Alerta Emergente.
    alerta('Producto MAD borrado');
    // Redirigir a la página de los Productos MAD.
    return res.redirect(`/sesion-miembro/${id}/empieza/productosmadservices`);
}

//-- Exportamos la configuración de la eliminación de un producto MAD para unificarlo con el resto de rutas.
module.exports = borrarProductoMAD;