//-- Importamos las funciones de operaciones de las Empresas para interactuar con la base de datos.
const { darseBajaEmpresadb } = require('../../modelos/empresas/operacionesDB.js');
//-- Importamos la función para sacar y mostrar los campos de las Empresas.
const mostrarEmpresadb = require('../../modelos/empresas/mostrarCampos.js');

//-- Creamos el Punto de Control para configurar el darse de baja como Empresa.
const darseBajaEmpresa = {}

darseBajaEmpresa.interfaz = async (req, res) => {

    //-- Obtenemos el parámetro del ID Empresa.
    let id = req.params.id;
    //-- Obtenemos las ctes que confirman si quieren darse de baja o no.
    const siConfirmo = req.body.siConfirmar;
    const noConfirmo = req.body.noConfirmar;
    //-- Si dejamos en blanco la confirmación de darse de baja, que avise de que debe confirmar.
    if(!siConfirmo && !noConfirmo) {
        mostrarEmpresadb
        (
            id,
            (tablaEmpresa) => {
                res.status(401).render('paginas/empresas/interfaz', 
                {
                    msjError2: 'Debes confirmar si quieres o no darte de baja',
                    id: tablaEmpresa.id,
                    email: tablaEmpresa.email,
                    password: tablaEmpresa.password,
                    marca: tablaEmpresa.marca,
                    tipo: tablaEmpresa.tipo,
                    nif: tablaEmpresa.nif,
                    ebitda: tablaEmpresa.ebitda
                });
                return res.end();
            }
        );
    }else if(siConfirmo && noConfirmo) {
        mostrarEmpresadb
        (
            id,
            (tablaEmpresa) => {
                res.status(401).render('paginas/empresas/interfaz', 
                {
                    msjError2: 'Debes elegir sólo una opción de confirmación',
                    id: tablaEmpresa.id,
                    email: tablaEmpresa.email,
                    password: tablaEmpresa.password,
                    marca: tablaEmpresa.marca,
                    tipo: tablaEmpresa.tipo,
                    nif: tablaEmpresa.nif,
                    ebitda: tablaEmpresa.ebitda
                });
                return res.end();
            }
        );
    }else if(!siConfirmo && noConfirmo) {
        mostrarEmpresadb
        (
            id,
            (tablaEmpresa) => {
                res.status(201).render('paginas/empresas/interfaz', 
                {
                    msjBaja: 'Has pulsado que no quieres darte de baja',
                    id: tablaEmpresa.id,
                    email: tablaEmpresa.email,
                    password: tablaEmpresa.password,
                    marca: tablaEmpresa.marca,
                    tipo: tablaEmpresa.tipo,
                    nif: tablaEmpresa.nif,
                    ebitda: tablaEmpresa.ebitda
                });
                return res.end();
            }
        );
    }else if(siConfirmo && !noConfirmo) {
        //-- Procedemos a dar de baja a la Empresa definitivamente.
        darseBajaEmpresadb
        (
            id,
            req,
            res
        );
    }
}

//-- Exportamos la configuración del darse de baja como Empresa para unificarlo con el resto de rutas.
module.exports = darseBajaEmpresa;