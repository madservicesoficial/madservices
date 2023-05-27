//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const {madservicesClientedb} = require('../../../config/database.js');

//-- Pto de control de sacar por pantalla los productos agregados al carrito.
const mostrarCarritodb = (id, res) => {
    
    //-- Sacar los productos MAD del carrito de la base de datos.
    let instruccionConsultaCarrito = 'SELECT * FROM carrito WHERE id = ?'
    let formatoInstruccionConsultaCarrito = mysql.format(instruccionConsultaCarrito, [id]);
    madservicesClientedb.query(formatoInstruccionConsultaCarrito, (error, results) => {
        if(error) throw error;
        //-- Sacarlo por pantalla.
        res.status(201).render('paginas/clientes/carrito', { id: id, carrito: results });
        return res.end();
    });
}

//-- Pto de control de sacar por pantalla los productos agregados al carrito.
const mostrarCompraClientedb = (id, res) => {
    
    //-- Sacar los productos MAD del carrito de la base de datos.
    let instruccionConsultaCliente = 'SELECT * FROM clientes WHERE id = ?';
    let formatoInstruccionConsultaCliente = mysql.format(instruccionConsultaCliente, [id]);
    madservicesClientedb.query(formatoInstruccionConsultaCliente, (error, results) => {
        if(error) throw error;
        const direccion = results[0].direccion;
        const poblacion = results[0].poblacion;
        const region = results[0].region;
        const pais = results[0].pais;
        const cp = results[0].cp;
        let instruccionConsultaCarrito = 'SELECT * FROM carrito WHERE id = ?';
        let formatoInstruccionConsultaCarrito = mysql.format(instruccionConsultaCarrito, [id]);
        madservicesClientedb.query(formatoInstruccionConsultaCarrito, (error, resultado) => {
            if(error) throw error;
            let instruccionConsultaTarjeta = 'SELECT * FROM tarjeta WHERE id = ?';
            let formatoInstruccionConsultaTarjeta = mysql.format(instruccionConsultaTarjeta, [id]);
            madservicesClientedb.query(formatoInstruccionConsultaTarjeta, (error, salida) => {
                if(error) throw error;
                const formatoFecha = '%m/%Y';
                let instruccionConsultaFechaExp = 'SELECT DATE_FORMAT(expiracion, ?) AS fechaFormateada FROM tarjeta WHERE id = ?';
                let formatoInstruccionConsultaFechaExp = mysql.format(instruccionConsultaFechaExp, [formatoFecha, id]);
                madservicesClientedb.query(formatoInstruccionConsultaFechaExp, (error, out) => {
                    if(error) throw error;
                    if(salida.length > 0) {
                        //-- Sacarlo por pantalla.
                        res.status(201).render('paginas/clientes/comprar', 
                        { 
                            id: id, 
                            direccion: direccion, 
                            poblacion: poblacion,
                            region: region,
                            pais: pais,
                            cp: cp,
                            carrito: resultado,
                            cliente: salida[0].cliente,
                            numcard: salida[0].numcard,
                            cvv: salida[0].cvv,
                            expiracion: out[0].fechaFormateada
                        });
                        return res.end();
                    }else {
                        let nohayTarjeta = true;
                        //-- Sacarlo por pantalla.
                        res.status(201).render('paginas/clientes/comprar', 
                        { 
                            id: id, 
                            direccion: direccion, 
                            poblacion: poblacion,
                            region: region,
                            pais: pais,
                            cp: cp,
                            carrito: resultado,
                            nohayTarjeta: nohayTarjeta
                        });
                        return res.end();
                    }
                });
            });
        });
    });
}

//-- Creamos la función que muestra los parámetros de la base de datos de los Clientes.
const mostrarClientedb = (id, res) => {
    
    //-- Instrucción del ID.
    let instruccionID = 'SELECT * FROM clientes WHERE id = ?';
    //-- Configuración de su formato en mysql.
    let formatoInstruccionID = mysql.format(instruccionID, [id]);
    //-- Establecer la comunicación de consultar ID en la base de datos.
    madservicesClientedb.query(formatoInstruccionID, (error, result) => {
        if(error) throw error;
        const tablaCliente = result[0];
        madservicesClientedb.query('SELECT * FROM tarjeta WHERE id = ?', [id], (error, resultados) => {
            if(error) throw error;
            const tarjetaCliente = resultados[0];
            const formatoFecha = '%m/%Y';
            madservicesClientedb.query('SELECT DATE_FORMAT(expiracion, ?) AS fechaFormateada FROM tarjeta WHERE id = ?', [formatoFecha, id], (error, results) => {
                if(error) throw error;
                const vacio = '-';
                //-- Instrucción del ID.
                let instruccionID = 'SELECT * FROM comprados WHERE email = ?';
                //-- Configuración de su formato en mysql.
                let formatoInstruccionID = mysql.format(instruccionID, [tablaCliente.email]);
                //-- Establecer la comunicación de consultar ID en la base de datos.
                madservicesClientedb.query(formatoInstruccionID, (error, salida) => {
                    if(error) throw error;
                    if(resultados.length > 0) {
                        res.status(201).render('paginas/clientes/perfil', 
                        {
                            id: id,
                            email: tablaCliente.email,
                            password: tablaCliente.password,
                            nombre: tablaCliente.nombre,
                            apellidos: tablaCliente.apellidos,
                            direccion: tablaCliente.direccion,
                            poblacion: tablaCliente.poblacion,
                            region: tablaCliente.region,
                            pais: tablaCliente.pais,
                            cp: tablaCliente.cp,
                            genero: tablaCliente.genero,
                            cliente: tarjetaCliente.cliente,
                            numcard: tarjetaCliente.numcard,
                            expiracion: results[0].fechaFormateada,
                            cvv: tarjetaCliente.cvv,
                            miscompras: salida
                        });
                        return res.end();
                    }else {
                        res.status(201).render('paginas/clientes/perfil', 
                        {
                            id: id,
                            email: tablaCliente.email,
                            password: tablaCliente.password,
                            nombre: tablaCliente.nombre,
                            apellidos: tablaCliente.apellidos,
                            direccion: tablaCliente.direccion,
                            poblacion: tablaCliente.poblacion,
                            region: tablaCliente.region,
                            pais: tablaCliente.pais,
                            cp: tablaCliente.cp,
                            genero: tablaCliente.genero,
                            expiracion: vacio,
                            miscompras: salida
                        });
                        return res.end();
                    }
                });
            });
        });
    });
}

//-- Función que muestra los productos MAD de forma completa e individualmente.
const mostrarExpansionClientesdb = (id, enumeracion, res) => {

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
                res.status(201).render('paginas/clientes/expansion', 
                { 
                    id: id,
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
                res.status(201).render('paginas/clientes/expansion', 
                { 
                    id: id,
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

//-- Función que muestra todos los productos MAD.
const mostrarProductosMADclientesdb = (id, res) => {
    
    //-- Instrucción que muestra productos MAD.
    let instruccionMuestraProductosMAD = 'SELECT * FROM productos';
    //-- Formato de la instrucción que muestra productos MAD.
    let formatoInstruccionMuestraProductosMAD = mysql.format(instruccionMuestraProductosMAD);
    //-- Establecemos la conexión con la base de datos.
    madservicesClientedb.query(formatoInstruccionMuestraProductosMAD, (error, results) => {
        if(error) throw error;
        res.status(201).render('paginas/clientes/productosmadservices', { cartaProducto: results, id: id });
        return res.end();
    });
}

//-- Función que muestra los productos Multimarca o The Mall.
const mostrarProductosTheMallClientedb = (id, res) => {
    
    let instruccionConsultarEmpresas = 'SELECT * FROM empresas';
    let formatoInstruccionConsultarEmpresas = mysql.format(instruccionConsultarEmpresas);
    madservicesClientedb.query(formatoInstruccionConsultarEmpresas, (error, results) => {
        if(error) throw error;
        res.status(201).render('paginas/clientes/productosTheMall',
        {
            id: id,
            empresas: results
        });
        return res.end();
    });
}

//-- Función que muestra la expansión de los productos Multimarca o The Mall.
const mostrarExpansionMultimarcaClientesdb = (id, marca, res) => {

    let instruccionConsultarEmpresas = 'SELECT * FROM empresas WHERE marca = ?';
    let formatoInstruccionConsultarEmpresas = mysql.format(instruccionConsultarEmpresas, [marca]);
    madservicesClientedb.query(formatoInstruccionConsultarEmpresas, (error, results) => {
        if(error) throw error;
        res.status(201).render('paginas/clientes/expansionMall',
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
    mostrarCarritodb,
    mostrarCompraClientedb,
    mostrarClientedb,
    mostrarExpansionClientesdb,
    mostrarProductosMADclientesdb,
    mostrarProductosTheMallClientedb,
    mostrarExpansionMultimarcaClientesdb
};
//#######################################################################################################//