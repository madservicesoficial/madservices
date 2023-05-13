//-- Importamos las funciones de operaciones de los Miembros MAD para interactuar con la base de datos.
const { borrarProductoMADdb, consultarEnumeraciondb, actualizarEnumeraciondb, salidaProductoBorrado } = require('../../modelos/miembros/operacionesDB.js');

//-- Creamos el Punto de Control para configurar la eliminación de un producto MAD.
const borrarProductoMAD = async (req, res) => {

    //-- Obtenemos el parámetro del ID Miembro MAD.
    let id = req.params.id;
    const enumeracion = req.body.enumeracion;
    //-- Declaramos la variable entera del punto de partida.
    const ptoPartida = parseInt(enumeracion, 10);
    //-- Incrementamos al siguiente la variable de enumeración.
    let auxiliar = ptoPartida;
    auxiliar = auxiliar + 1;
    let i;
    let insertar;
    //-- Borramos el producto MAD de la base de datos.
    borrarProductoMADdb(ptoPartida);
    //-- Realizamos el bucle para ajustar la enumeración después de borrar.
    for(i = auxiliar; i > ptoPartida; i++) {

        //-- Consultamos la enumeración del Producto MAD.
        let haySiguiente = await consultarEnumeraciondb(i);
        if(haySiguiente === 0) {
            i = ptoPartida - 1;
        }else {
            insertar = i - 1;
            //-- Cambiamos la enumeración a la anterior.
            actualizarEnumeraciondb(insertar, i);
        }
    }
    //-- Salida con alerta.
    salidaProductoBorrado(id, res);
}

//-- Exportamos la configuración de la eliminación de un producto MAD para unificarlo con el resto de rutas.
module.exports = borrarProductoMAD;