//-- Importamos las funciones de operaciones de los Miembros MAD para interactuar con la base de datos.
const { darseBajaMiembrodb } = require('../../modelos/miembros/operacionesDB.js');

//-- Creamos el Punto de Control para configurar el darse de baja como Miembro MAD.
const darseBajaMiembro = (req, res) => {

    //-- Obtenemos el parámetro del ID Miembro MAD.
    let id = req.params.id;
    //-- Obtenemos las ctes que confirman si quieren darse de baja o no.
    const siConfirmo = req.body.siConfirmar;
    const noConfirmo = req.body.noConfirmar;
    //-- Procedemos a dar de baja al Miembro MAD definitivamente, siguiendo los requisitos.
    darseBajaMiembrodb(id, siConfirmo, noConfirmo, req, res);
}

//-- Exportamos la configuración del darse de baja del Miembro MAD para unificarlo con el resto de rutas.
module.exports = darseBajaMiembro;