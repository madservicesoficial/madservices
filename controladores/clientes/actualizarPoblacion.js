

//-- Creamos el Punto de Control para configurar la actualización del campo población del perfil del cliente.
const actualizarPoblacion = (req, res) => {

    //-- Introducción del campo población del perfil del cliente para actualizarlo en base de datos.
    let id = req.params.id;
    const poblacion = req.body.poblacion;
}

//-- Exportamos la configuración de la actualización del campo población del perfil del cliente para unificarlo con el resto de rutas.
module.exports = actualizarPoblacion;