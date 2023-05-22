//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const {madservicesEmpresadb} = require('../../../config/database.js');

//-- Creamos la función que saca los datos de la base de datos de las Empresas.
const mostrarDatosdb = (id, callback) => {

    //-- Instrucción del ID.
    let instruccionID = 'SELECT * FROM empresas WHERE id = ?';
    //-- Configuración de su formato en mysql.
    let formatoInstruccionID = mysql.format(instruccionID, [id]);
    //-- Establecer la comunicación de consultar ID en la base de datos.
    madservicesEmpresadb.query(formatoInstruccionID, (error, result) => {
        if(error) throw error;
        const tablaEmpresa = result[0];
        callback(tablaEmpresa);
    });
}

//-- Creamos la función que saca la Descripción de la base de datos de las Empresas.
function mostrarDescripciondb(id) {

    //-- Instrucción del ID.
    let instruccionID = 'SELECT * FROM companyd WHERE id = ?';
    //-- Configuración de su formato en mysql.
    let formatoInstruccionID = mysql.format(instruccionID, [id]);
    //-- Establecer la comunicación de consultar ID en la base de datos para sacarlo como variable.
    return new Promise((resolve) => {
        madservicesEmpresadb.query(formatoInstruccionID, (error, results) => {
            if(error) throw error;
            if(results[0] === undefined) {
                const zero = 0;
                resolve(zero);
            }else {
                const descripcion = results[0].descripcion;
                resolve(descripcion);
            }
        });
    });
}

//-- Creamos la función que saca el Instagram de la base de datos de las Empresas.
function mostrarInstagramdb(id) {

    //-- Instrucción del ID.
    let instruccionID = 'SELECT * FROM companyi WHERE id = ?';
    //-- Configuración de su formato en mysql.
    let formatoInstruccionID = mysql.format(instruccionID, [id]);
    //-- Establecer la comunicación de consultar ID en la base de datos para sacarlo como variable.
    return new Promise((resolve) => {
        madservicesEmpresadb.query(formatoInstruccionID, (error, results) => {
            if(error) throw error;
            if(results[0] === undefined) {
                const zero = 0;
                resolve(zero);
            }else {
                const instagram = results[0].instagram;
                resolve(instagram);
            }
        });
    });
}

//-- Creamos la función que saca la Descripción de la base de datos de las Empresas.
function mostrarPagWebdb(id) {

    //-- Instrucción del ID.
    let instruccionID = 'SELECT * FROM companypg WHERE id = ?';
    //-- Configuración de su formato en mysql.
    let formatoInstruccionID = mysql.format(instruccionID, [id]);
    //-- Establecer la comunicación de consultar ID en la base de datos para sacarlo como variable.
    return new Promise((resolve) => {
        madservicesEmpresadb.query(formatoInstruccionID, (error, results) => {
            if(error) throw error;
            if(results[0] === undefined) {
                const zero = 0;
                resolve(zero);
            }else {
                const pagweb = results[0].pagweb;
                resolve(pagweb);
            }
        });
    });
}

//-- Creamos la función que saca el Twitter de la base de datos de las Empresas.
function mostrarTwitterdb(id) {

    //-- Instrucción del ID.
    let instruccionID = 'SELECT * FROM companyt WHERE id = ?';
    //-- Configuración de su formato en mysql.
    let formatoInstruccionID = mysql.format(instruccionID, [id]);
    //-- Establecer la comunicación de consultar ID en la base de datos para sacarlo como variable.
    return new Promise((resolve) => {
        madservicesEmpresadb.query(formatoInstruccionID, (error, results) => {
            if(error) throw error;
            if(results[0] === undefined) {
                const zero = 0;
                resolve(zero);
            }else {
                const twitter = results[0].twitter;
                resolve(twitter);
            }
        });
    });
}

//-- Creamos la función que saca el Whatsapp de la base de datos de las Empresas.
function mostrarWhatsappdb(id) {

    //-- Instrucción del ID.
    let instruccionID = 'SELECT * FROM companyw WHERE id = ?';
    //-- Configuración de su formato en mysql.
    let formatoInstruccionID = mysql.format(instruccionID, [id]);
    //-- Establecer la comunicación de consultar ID en la base de datos para sacarlo como variable.
    return new Promise((resolve) => {
        madservicesEmpresadb.query(formatoInstruccionID, (error, results) => {
            if(error) throw error;
            if(results[0] === undefined) {
                const zero = 0;
                resolve(zero);
            }else {
                const whatsapp = results[0].whatsapp;
                resolve(whatsapp);
            }
        });
    });
}

//-- Función que muestra los productos Multimarca o The Mall.
const mostrarProductosTheMallEmpresa = (req, res) => {
    
    //-- Variable ID de la Empresa.
    let id = req.params.id;
    //-- Renderizar la Página de The Mall.
    res.status(201).render('paginas/empresas/productosTheMall', {id: id});
}

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = {
    mostrarDatosdb,
    mostrarDescripciondb,
    mostrarInstagramdb,
    mostrarPagWebdb,
    mostrarTwitterdb,
    mostrarWhatsappdb,
    mostrarProductosTheMallEmpresa
};
//#######################################################################################################//