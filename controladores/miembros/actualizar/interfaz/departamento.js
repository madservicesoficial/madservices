//-- Importamos las funciones de operaciones de los Miembros MAD para interactuar con la base de datos.
const { actualizarDepartamentoVerificadodb } = require('../../modelos/miembros/operacionesDB.js');

//-- Creamos el Punto de Control para actualizar el campo departamento del Miembro MAD.
const actualizarDepartamento = (req, res) => {

    //-- Introducimos los campos a actualizar.
    let id = req.params.id;
    const departamento = req.body.departamento;
    //-- Función actualizar el campo departamento del Miembro MAD.
    actualizarDepartamentoVerificadodb(id, departamento, res);
}

//-- Exportamos la configuración de actualizar el campo departamento del Miembro MAD para unificarlo con el resto de rutas.
module.exports = actualizarDepartamento;