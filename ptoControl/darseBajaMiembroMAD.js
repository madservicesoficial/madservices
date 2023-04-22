//-- Importamos las funciones de operaciones de los Miembros MAD para interactuar con la base de datos.
const { darseBajaMiembroMADdb } = require('../operacionesdb/operacionesMiembroMADdb.js');
//-- Importamos la función para sacar y mostrar los campos del Miembro MAD.
const sacarParametrosMiembroMADdb = require('../operacionesdb/operacionesParametrosMiembrosMAD.js');

//-- Creamos el Punto de Control para configurar el darse de baja del Miembro MAD.
const darseBajaMiembroMAD = {}

darseBajaMiembroMAD.interfazMiembroMAD = async (req, res) => {

    //-- Obtenemos el parámetro del ID Miembro MAD.
    let id = req.params.id;
    //-- Obtenemos las ctes que confirman si quieren darse de baja o no.
    const siConfirmo = req.body.siConfirmar;
    const noConfirmo = req.body.noConfirmar;
    //-- Si dejamos en blanco la confirmación de darse de baja, que avise de que debe confirmar.
    if(!siConfirmo && !noConfirmo) {
        sacarParametrosMiembroMADdb
        (
            id,
            (tablaMiembrosMAD) => {
                res.status(401).render('paginas/interfazMiembroMAD', 
                {
                    msjError2: 'Debes confirmar si quieres o no darte de baja',
                    id: tablaMiembrosMAD.id,
                    miembro: tablaMiembrosMAD.miembro,
                    departamento: tablaMiembrosMAD.departamento,
                    genero: tablaMiembrosMAD.genero,
                    email: tablaMiembrosMAD.email,
                    password: tablaMiembrosMAD.password,
                });
                return res.end();
            }
        );
    }else if(siConfirmo && noConfirmo) {
        sacarParametrosMiembroMADdb
        (
            id,
            (tablaMiembrosMAD) => {
                res.status(401).render('paginas/interfazMiembroMAD', 
                {
                    msjError2: 'Debes elegir sólo una opción de confirmación',
                    id: tablaMiembrosMAD.id,
                    miembro: tablaMiembrosMAD.miembro,
                    departamento: tablaMiembrosMAD.departamento,
                    genero: tablaMiembrosMAD.genero,
                    email: tablaMiembrosMAD.email,
                    password: tablaMiembrosMAD.password,
                });
                return res.end();
            }
        );
    }else if(!siConfirmo && noConfirmo) {
        sacarParametrosMiembroMADdb
        (
            id,
            (tablaMiembrosMAD) => {
                res.status(201).render('paginas/interfazMiembroMAD', 
                {
                    msjBaja: 'Has pulsado que no quieres darte de baja',
                    id: tablaMiembrosMAD.id,
                    miembro: tablaMiembrosMAD.miembro,
                    departamento: tablaMiembrosMAD.departamento,
                    genero: tablaMiembrosMAD.genero,
                    email: tablaMiembrosMAD.email,
                    password: tablaMiembrosMAD.password,
                });
                return res.end();
            }
        );
    }else if(siConfirmo && !noConfirmo) {
        //-- Procedemos a dar de baja al Miembro MAD definitivamente.
        darseBajaMiembroMADdb
        (
            id,
            req,
            res
        );
    }
}

//-- Exportamos la configuración del darse de baja del Miembro MAD para unificarlo con el resto de rutas.
module.exports = darseBajaMiembroMAD;