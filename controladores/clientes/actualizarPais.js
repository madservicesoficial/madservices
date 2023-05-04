//-- Importamos las funciones de operaciones de los Clientes para interactuar con la base de datos.
const { actualizarPaisVerificadodb } = require('../../modelos/clientes/operacionesDB.js');

//-- Creamos el Punto de Control para configurar la actualización del campo país del perfil del cliente.
const actualizarPais = (req, res) => {

    //-- Introducción del campo país del perfil del cliente para actualizarlo en base de datos.
    let id = req.params.id;
    const pais = req.body.pais;
    //-- Función actualizar el campo.
    actualizarPaisVerificadodb(id, pais, res);
}

//-- Exportamos la configuración de la actualización del campo país del perfil del cliente para unificarlo con el resto de rutas.
module.exports = actualizarPais;