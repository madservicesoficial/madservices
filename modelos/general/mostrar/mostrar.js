//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const {madservicesClientedb} = require('../../../config/database.js');

//-- Función que muestra los productos MAD de forma completa e individualmente.
const mostrarExpansiondb = (enumeracion, res) => {
    
    //-- Instrucción que muestra productos MAD.
    let instruccionMuestraExpansionGeneral = 'SELECT * FROM productos WHERE enumeracion = ?';
    //-- Formato de la instrucción que muestra productos MAD.
    let formatoInstruccionMuestraExpansionGeneral = mysql.format(instruccionMuestraExpansionGeneral, [enumeracion]);
    //-- Establecemos la conexión con la base de datos.
    madservicesClientedb.query(formatoInstruccionMuestraExpansionGeneral, (error, results) => {
        if(error) throw error;
        let instruccionMuestraMasArchivos = 'SELECT * FROM multimedia WHERE enumeracion = ?';
        let formatoInstruccionMuestraMasArchivos = mysql.format(instruccionMuestraMasArchivos, [enumeracion]);
        madservicesClientedb.query(formatoInstruccionMuestraMasArchivos, (error, results1) => {
            if(error) throw error;
            if(results1.length !== 0) {
                let imagenes = new Array(10);
                imagenes = {
                    imagenPortada: results[0].portada,
                    imagen1: results1[0].fileuno,
                    imagen2: results1[0].filedos,
                    imagen3: results1[0].filetres,
                    imagen4: results1[0].filecuatro,
                    imagen5: results1[0].filecinco,
                    imagen6: results1[0].fileseis,
                    imagen7: results1[0].filesiete,
                    imagen8: results1[0].fileocho,
                    imagen9: results1[0].filenueve
                };
                res.status(201).render('paginas/general/expansion', 
                {
                    enumeracion: enumeracion,
                    imagenPortada: results[0].portada,
                    titulo: results[0].titulo,
                    precio: results[0].precio,
                    peso: results[0].peso,
                    cantidad: results[0].cantidad,
                    categoria: results[0].producto,
                    descripcion: results[0].descripcion,
                    multimedia: imagenes
                });
                return res.end();
            }else {
                res.status(201).render('paginas/general/expansion', 
                { 
                    enumeracion: enumeracion,
                    imagenPortada: results[0].portada,
                    titulo: results[0].titulo,
                    precio: results[0].precio,
                    peso: results[0].peso,
                    cantidad: results[0].cantidad,
                    categoria: results[0].producto,
                    descripcion: results[0].descripcion
                });
                return res.end();
            }
        });
    });
}

//-- Función que muestra los productos MAD.
const mostrarProductosMADdb = (res) => {
    //-- Instrucción que muestra productos MAD.
    let instruccionMuestraProductosMAD = 'SELECT * FROM productos';
    //-- Formato de la instrucción que muestra productos MAD.
    let formatoInstruccionMuestraProductosMAD = mysql.format(instruccionMuestraProductosMAD);
    //-- Establecemos la conexión con la base de datos.
    madservicesClientedb.query(formatoInstruccionMuestraProductosMAD, (error, results) => {
        if(error) throw error;
        res.status(201).render('paginas/general/productosmadservices', { cartaProducto: results});
        return res.end();
    });
}

//-- Función que muestra los productos Multimarca o The Mall.
const mostrarProductosTheMalldb = (res) => {
    
    let instruccionConsultarEmpresas = 'SELECT * FROM empresas';
    let formatoInstruccionConsultarEmpresas = mysql.format(instruccionConsultarEmpresas);
    madservicesClientedb.query(formatoInstruccionConsultarEmpresas, (error, results) => {
        if(error) throw error;
        res.status(201).render('paginas/general/productosTheMall',
        {
            empresas: results
        });
        return res.end();
    });
}

//-- Función que muestra la expansión de los productos Multimarca o The Mall.
const mostrarExpansionMultimarcadb = (marca, res) => {

    let instruccionConsultarEmpresas = 'SELECT * FROM empresas WHERE marca = ?';
    let formatoInstruccionConsultarEmpresas = mysql.format(instruccionConsultarEmpresas, [marca]);
    madservicesClientedb.query(formatoInstruccionConsultarEmpresas, (error, results) => {
        if(error) throw error;
        res.status(201).render('paginas/general/expansionMall',
        {
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
    mostrarExpansiondb,
    mostrarProductosMADdb,
    mostrarProductosTheMalldb,
    mostrarExpansionMultimarcadb
};
//#######################################################################################################//