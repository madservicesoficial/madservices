

//-- Creamos el Punto de Control para configurar la actualización del campo nombre del perfil del cliente.
const actualizarNombre = (req, res) => {

    //-- Introducción del campo nombre del perfil del cliente para actualizarlo en base de datos.
    let id = req.params.id;
    const nombre = req.body.nombre;
}

//-- Exportamos la configuración de la actualización del campo nombre del perfil del cliente para unificarlo con el resto de rutas.
module.exports = actualizarNombre;