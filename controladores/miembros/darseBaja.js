//-- Importamos las funciones de operaciones de los Miembros MAD para interactuar con la base de datos.
const { darseBajaMiembrodb } = require('../../modelos/miembros/operacionesDB.js');
//-- Importamos la función para sacar y mostrar los campos del Miembro MAD.
const mostrarMiembrodb = require('../../modelos/miembros/mostrarCampos.js');

//-- Creamos el Punto de Control para configurar el darse de baja como Miembro MAD.
const darseBajaMiembro = {}

darseBajaMiembro.interfaz = async (req, res) => {

    //-- Obtenemos el parámetro del ID Miembro MAD.
    let id = req.params.id;
    //-- Obtenemos las ctes que confirman si quieren darse de baja o no.
    const siConfirmo = req.body.siConfirmar;
    const noConfirmo = req.body.noConfirmar;
    //-- Si dejamos en blanco la confirmación de darse de baja, que avise de que debe confirmar.
    if(!siConfirmo && !noConfirmo) {
        mostrarMiembrodb
        (
            id,
            (tablaMiembro) => {
                res.status(401).render('paginas/miembros/interfaz', 
                {
                    msjError2: 'Debes confirmar si quieres o no darte de baja',
                    id: tablaMiembro.id,
                    email: tablaMiembro.email,
                    password: tablaMiembro.password,
                    miembro: tablaMiembro.miembro,
                    departamento: tablaMiembro.departamento,
                    genero: tablaMiembro.genero
                });
                return res.end();
            }
        );
    }else if(siConfirmo && noConfirmo) {
        mostrarMiembrodb
        (
            id,
            (tablaMiembro) => {
                res.status(401).render('paginas/miembros/interfaz', 
                {
                    msjError2: 'Debes elegir sólo una opción de confirmación',
                    id: tablaMiembro.id,
                    email: tablaMiembro.email,
                    password: tablaMiembro.password,
                    miembro: tablaMiembro.miembro,
                    departamento: tablaMiembro.departamento,
                    genero: tablaMiembro.genero
                });
                return res.end();
            }
        );
    }else if(!siConfirmo && noConfirmo) {
        mostrarMiembrodb
        (
            id,
            (tablaMiembro) => {
                res.status(201).render('paginas/miembros/interfaz', 
                {
                    msjBaja: 'Has pulsado que no quieres darte de baja',
                    id: tablaMiembro.id,
                    email: tablaMiembro.email,
                    password: tablaMiembro.password,
                    miembro: tablaMiembro.miembro,
                    departamento: tablaMiembro.departamento,
                    genero: tablaMiembro.genero
                });
                return res.end();
            }
        );
    }else if(siConfirmo && !noConfirmo) {
        //-- Procedemos a dar de baja al Miembro MAD definitivamente.
        darseBajaMiembrodb
        (
            id,
            req,
            res
        );
    }
}

//-- Exportamos la configuración del darse de baja del Miembro MAD para unificarlo con el resto de rutas.
module.exports = darseBajaMiembro;