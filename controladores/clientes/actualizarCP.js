

//-- Creamos el Punto de Control para configurar la actualización del campo CP del perfil del cliente.
const actualizarCP = (req, res) => {

    //-- Introducción del campo CP del perfil del cliente para actualizarlo en base de datos.
    let id = req.params.id;
    const cp = req.body.cp;
}

//-- Exportamos la configuración de la actualización del campo CP del perfil del cliente para unificarlo con el resto de rutas.
module.exports = actualizarCP;