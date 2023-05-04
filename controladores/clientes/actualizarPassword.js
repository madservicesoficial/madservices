

//-- Creamos el Punto de Control para configurar la actualización del campo contraseña del perfil del cliente.
const actualizarPasswordCliente = (req, res) => {

    //-- Introducción del campo contraseña del perfil del cliente para actualizarlo en base de datos.
    let id = req.params.id;
    const oldpassword = req.body.oldpassword;
    const newpassword = req.body.newpassword;
    const repitePassword = req.body.repitePassword;
}

//-- Exportamos la configuración de la actualización del campo contraseña del perfil del cliente para unificarlo con el resto de rutas.
module.exports = actualizarPasswordCliente;