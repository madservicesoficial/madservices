//-- Importamos las funciones de operaciones de los Clientes para interactuar con la base de datos.
const { darseBajaClientedb } = require('../../modelos/clientes/operacionesDB.js');

//-- Creamos el Punto de Control para configurar el darse de baja del cliente.
const darseBajaCliente = (req, res) => {

    //-- Obtenemos el parámetro del ID cliente.
    let id = req.params.id;
    //-- Obtenemos las ctes que confirman si quieren darse de baja o no.
    const dileAdios = req.body.dileAdios;
    //-- Procedemos a dar de baja al Cliente definitivamente, siguiendo los requisitos.
    darseBajaClientedb(id, dileAdios, req, res);
}

//-- Exportamos la configuración del darse de baja del cliente para unificarlo con el resto de rutas.
module.exports = darseBajaCliente;