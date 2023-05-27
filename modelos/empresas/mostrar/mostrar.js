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
        res.status(201).render('paginas/empresas/interfaz', 
        {
            id: id,
            email: result[0].email,
            password: result[0].password,
            marca: result[0].marca,
            nif: result[0].nif,
            tipo: result[0].tipo,
            descripcion: result[0].descripcion,
            instagram: result[0].instagram,
            twitter: result[0].twitter,
            whatsapp: result[0].whatsapp,
            pagweb: result[0].pagweb,
            logo: result[0].logo
        });
        return res.end();
    });
}

//-- Función que muestra los productos Multimarca o The Mall.
const mostrarProductosTheMallEmpresadb = (id, res) => {
    
    let instruccionConsultarEmpresas = 'SELECT * FROM empresas';
    let formatoInstruccionConsultarEmpresas = mysql.format(instruccionConsultarEmpresas);
    madservicesEmpresadb.query(formatoInstruccionConsultarEmpresas, (error, results) => {
        if(error) throw error;
        res.status(201).render('paginas/empresas/productosTheMall',
        {
            id: id,
            empresas: results
        });
        return res.end();
    });
}

const mostrarExpansionMultimarcaEmpresasdb = (id, marca, res) => {

    let instruccionConsultarEmpresas = 'SELECT * FROM empresas WHERE marca = ?';
    let formatoInstruccionConsultarEmpresas = mysql.format(instruccionConsultarEmpresas, [marca]);
    madservicesEmpresadb.query(formatoInstruccionConsultarEmpresas, (error, results) => {
        if(error) throw error;
        res.status(201).render('paginas/empresas/expansion',
        {
            id: id,
            marca: marca,
            email: results[0].email,
            tipo: results[0].tipo,
            descripcion: results[0].descripcion,
            instagram: results[0].instagram,
            twitter: results[0].twitter,
            pagweb: results[0].pagweb,
            whatsapp: results[0].whatsapp,
            logo: results[0].logo
        });
        return res.end();
    });
}

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = {
    mostrarEmpresadb,
    mostrarProductosTheMallEmpresadb,
    mostrarExpansionMultimarcaEmpresasdb
};
//#######################################################################################################//