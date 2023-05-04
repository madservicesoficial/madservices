

//-- Creamos el Punto de Control para configurar la actualización del campo apellidos del perfil del cliente.
const actualizarApellidos = (req, res) => {

    //-- Introducción del campo apellidos del perfil del cliente para actualizarlo en base de datos.
    let id = req.params.id;
    const apellidos = req.body.apellidos;
}

//-- Exportamos la configuración de la actualización del campo apellidos del perfil del cliente para unificarlo con el resto de rutas.
module.exports = actualizarApellidos;