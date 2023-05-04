

//-- Creamos el Punto de Control para configurar la actualización del campo región del perfil del cliente.
const actualizarRegion = (req, res) => {

    //-- Introducción del campo región del perfil del cliente para actualizarlo en base de datos.
    let id = req.params.id;
    const region = req.body.region;
}

//-- Exportamos la configuración de la actualización del campo región del perfil del cliente para unificarlo con el resto de rutas.
module.exports = actualizarRegion;