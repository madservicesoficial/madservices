//-- Importamos las funciones que muestran otros campos de la interfaz del Miembro MAD.
const mostrarEmaildb = require('./mostrarEmail.js');
const mostrarPassworddb = require('./mostrarPassword.js');
const mostrarElMiembrodb = require('./mostrarMiembro.js');
const mostrarDepartamentodb = require('./mostrarDepartamento.js');
const mostrarGenerodb = require('./mostrarGenero.js');
const mostrarDatosdb = require('./mostrarDatos.js');

//-- Creamos la función que saca parámetros de la base de datos de los Miembros MAD.
const mostrarMiembrodb = async (req, res) => {

    //-- Leemos el ID del Miembro MAD en ese momento.
    let id = req.params.id;
    //-- Leemos toda la información a sacar de la interfaz del Mimebro MAD.
    const email = await mostrarEmaildb(id);
    const password = await mostrarPassworddb(id);
    const miembro = await mostrarElMiembrodb(id);
    const departamento = await mostrarDepartamentodb(id);
    const genero = await mostrarGenerodb(id);
    mostrarDatosdb(id, email, password, miembro, departamento, genero, res);
}

//-- Exportamos las funciones.
module.exports = mostrarMiembrodb;