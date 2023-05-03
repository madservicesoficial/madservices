//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const {madservicesAdmindb} = require('../../config/database.js');

//-- Creamos la función que saca parámetros de la base de datos de los Miembros MAD.
const mostrarMiembrodb = (req, res) => {

    //-- Leemos el ID del Miembro MAD en ese momento.
    let id = req.params.id;
    //-- Instrucción del ID.
    let instruccionID = 'SELECT * FROM miembros WHERE id = ?';
    //-- Configuración de su formato en mysql.
    let formatoInstruccionID = mysql.format(instruccionID, id);
    //-- Establecer la comunicación de consultar ID en la base de datos.
    madservicesAdmindb.query(formatoInstruccionID, (error, result) => {
        if(error) throw error;
        const tablaMiembro = result[0];
        res.render('paginas/miembros/interfaz', 
        {
            id: id,
            email: tablaMiembro.email,
            password: tablaMiembro.password,
            miembro: tablaMiembro.miembro,
            departamento: tablaMiembro.departamento,
            genero: tablaMiembro.genero
        });
        return res.end();
    });
}

//-- Exportamos las funciones.
module.exports = mostrarMiembrodb;