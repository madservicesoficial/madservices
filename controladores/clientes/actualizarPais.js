

//-- Creamos el Punto de Control para configurar la actualización del campo país del perfil del cliente.
const actualizarPais = (req, res) => {

    //-- Introducción del campo país del perfil del cliente para actualizarlo en base de datos.
    let id = req.params.id;
    const pais = req.body.pais;
}

//-- Exportamos la configuración de la actualización del campo país del perfil del cliente para unificarlo con el resto de rutas.
module.exports = actualizarPais;