//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const {madservicesEmpresadb} = require('../../../config/database.js');

//-- Creamos la función que saca todos los datos de la base de datos de las Empresas hacia su interfaz.
const mostrarEmpresadb = (id, res) => {

    //-- Instrucción del ID.
    let instruccionID = 'SELECT * FROM empresas WHERE id = ?';
    //-- Configuración de su formato en mysql.
    let formatoInstruccionID = mysql.format(instruccionID, [id]);
    //-- Establecer la comunicación de consultar ID en la base de datos.
    madservicesEmpresadb.query(formatoInstruccionID, (error, result) => {
        if(error) throw error;
        //-- Instrucción del ID.
        let instruccionID2 = 'SELECT * FROM mktingcom WHERE id = ?';
        //-- Configuración de su formato en mysql.
        let formatoInstruccionID2 = mysql.format(instruccionID2, [id]);
        //-- Establecer la comunicación de consultar ID en la base de datos.
        madservicesEmpresadb.query(formatoInstruccionID2, (error, result2) => {
            if(error) throw error;
            res.status(201).render('paginas/empresas/interfaz', 
            {
                id: id,
                email: result[0].email,
                password: result[0].password,
                marca: result[0].marca,
                nif: result[0].nif,
                tipo: result[0].tipo,
                descripcion: result2[0].descripcion,
                instagram: result2[0].instagram,
                twitter: result2[0].twitter,
                whatsapp: result2[0].whatsapp,
                pagweb: result2[0].pagweb
            });
            return res.end();
        });
    });
}

//-- Función que muestra los productos Multimarca o The Mall.
const mostrarProductosTheMallEmpresadb = (id, res) => {
    
    //-- Renderizar la Página de The Mall.
    res.status(201).render('paginas/empresas/productosTheMall', {id: id});
}

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = {
    mostrarEmpresadb,
    mostrarProductosTheMallEmpresadb
};
//#######################################################################################################//