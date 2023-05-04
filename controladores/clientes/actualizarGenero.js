

//-- Creamos el Punto de Control para configurar la actualización del campo género del perfil del cliente.
const actualizarGeneroCliente = (req, res) => {

    //-- Introducción del campo género del perfil del cliente para actualizarlo en base de datos.
    let id = req.params.id;
    const genero = req.body.genero;
}

//-- Exportamos la configuración de la actualización del campo género del perfil del cliente para unificarlo con el resto de rutas.
module.exports = actualizarGeneroCliente;