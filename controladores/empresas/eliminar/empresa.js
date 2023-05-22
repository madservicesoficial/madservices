//-- Importamos las funciones de operaciones de las Empresas para interactuar con la base de datos.
const { darseBajaEmpresadb } = require('../../modelos/empresas/operacionesDB.js');

//-- Creamos el Punto de Control para configurar el darse de baja como Empresa.
const darseBajaEmpresa = async (req, res) => {

    //-- Obtenemos el parámetro del ID Empresa.
    let id = req.params.id;
    //-- Obtenemos las ctes que confirman si quieren darse de baja o no.
    const confirmarOpcion = req.body.confirmarOpcion;
    //-- Procedemos a dar de baja a la Empresa definitivamente, siguiendo los requisitos.
    darseBajaEmpresadb(id, confirmarOpcion, req, res);
}

//-- Exportamos la configuración del darse de baja como Empresa para unificarlo con el resto de rutas.
module.exports = darseBajaEmpresa;