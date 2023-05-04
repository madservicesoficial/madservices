

//-- Creamos el Punto de Control para configurar la actualización del campo dirección del perfil del cliente.
const actualizarDireccion = (req, res) => {

    //-- Introducción del campo dirección del perfil del cliente para actualizarlo en base de datos.
    let id = req.params.id;
    const direccion = req.body.direccion;
}

//-- Exportamos la configuración de la actualización del campo dirección del perfil del cliente para unificarlo con el resto de rutas.
module.exports = actualizarDireccion;