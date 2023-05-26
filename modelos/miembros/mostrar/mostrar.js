//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const {madservicesAdmindb} = require('../../../config/database.js');

//-- Creamos la función que saca los Productos MAD de la base de datos para verlos en la Interfaz del Miembro MAD.
const mostrarMiembrodb = (id, res) => {

    //-- Instrucción del ID.
    let instruccionID = 'SELECT * FROM comprados';
    //-- Configuración de su formato en mysql.
    let formatoInstruccionID = mysql.format(instruccionID);
    //-- Establecer la comunicación con los Productos MAD de la base de datos.
    madservicesAdmindb.query(formatoInstruccionID, (error, result) => {
        if(error) throw error;
        //-- Instrucción del ID.
        let instruccionID = 'SELECT * FROM clientes';
        //-- Configuración de su formato en mysql.
        let formatoInstruccionID = mysql.format(instruccionID);
        //-- Establecer la comunicación con los Productos MAD de la base de datos.
        madservicesAdmindb.query(formatoInstruccionID, (error, salida1) => {
            if(error) throw error;
            let cardH = 0;
            let cardM = 0;
            let cardO = 0;
            for(let cont=0; cont<salida1.length; cont++) {
                if(salida1[cont].genero === 'Hombre') {
                    madservicesAdmindb.query('SELECT * FROM tarjeta WHERE id = ?', [salida1[cont].id], (error, salida6) => {
                        if(error) throw error;
                        if(salida6.length !== 0) {
                            cardH = cardH + 1;
                        }
                    });
                }else if(salida1[cont].genero === 'Mujer') {
                    madservicesAdmindb.query('SELECT * FROM tarjeta WHERE id = ?', [salida1[cont].id], (error, salida6) => {
                        if(error) throw error;
                        if(salida6.length !== 0) {
                            cardM = cardM + 1;
                        }
                    });
                }else {
                    madservicesAdmindb.query('SELECT * FROM tarjeta WHERE id = ?', [salida1[cont].id], (error, salida6) => {
                        if(error) throw error;
                        if(salida6.length !== 0) {
                            cardO = cardO + 1;
                        }
                    });
                }
            }
            //-- Instrucción del ID.
            let instruccionID = 'SELECT * FROM empresas';
            //-- Configuración de su formato en mysql.
            let formatoInstruccionID = mysql.format(instruccionID);
            //-- Establecer la comunicación con los Productos MAD de la base de datos.
            madservicesAdmindb.query(formatoInstruccionID, (error, salida2) => {
                if(error) throw error;
                let sumaRest = 0;
                let sumaAca = 0;
                let sumaCom = 0;
                let sumaPeluq = 0;
                for(let k=0; k<salida2.length; k++) {
                    if(salida2[k].tipo === 'RESTAURANTE') {
                        sumaRest = sumaRest + 1;
                    }else if(salida2[k].tipo === 'ACADEMIA') {
                        sumaAca = sumaAca + 1;
                    }else if(salida2[k].tipo === 'COMERCIO') {
                        sumaCom = sumaCom + 1;
                    }else {
                        sumaPeluq = sumaPeluq + 1;
                    }
                }
                //-- Instrucción del ID.
                let instruccionID = 'SELECT * FROM miembros';
                //-- Configuración de su formato en mysql.
                let formatoInstruccionID = mysql.format(instruccionID);
                //-- Establecer la comunicación con los Productos MAD de la base de datos.
                madservicesAdmindb.query(formatoInstruccionID, (error, salida3) => {
                    if(error) throw error;
                    let miembrosDireccion = 0;
                    let miembrosAdministracion = 0;
                    let miembrosCiberseguridad = 0;
                    let miembrosIngenieria = 0;
                    let miembrosRRHH = 0;
                    let miembrosVentas = 0;
                    let miembrosEconomia = 0;
                    for(let i=0; i<salida3.length; i++) {
                        if(salida3[i].departamento === 'DIRECCION') {
                            miembrosDireccion = miembrosDireccion + 1;
                        }else if(salida3[i].departamento === 'ADMINISTRACION') {
                            miembrosAdministracion = miembrosAdministracion + 1;
                        }else if(salida3[i].departamento === 'CIBERSEGURIDAD') {
                            miembrosCiberseguridad = miembrosCiberseguridad + 1;
                        }else if(salida3[i].departamento === 'INGENIERIA') {
                            miembrosIngenieria = miembrosIngenieria + 1;
                        }else if(salida3[i].departamento === 'RRHH') {
                            miembrosRRHH = miembrosRRHH + 1;
                        }else if(salida3[i].departamento === 'VENTAS') {
                            miembrosVentas = miembrosVentas + 1;
                        }else if(salida3[i].departamento === 'ECONOMIA') {
                            miembrosEconomia = miembrosEconomia + 1;
                        }
                    }
                    //-- Instrucción del ID.
                    let instruccionID = 'SELECT titulo, SUM(cantidad) AS total_cantidad, SUM(precio * cantidad) AS total_precio FROM carrito GROUP BY titulo';
                    //-- Configuración de su formato en mysql.
                    let formatoInstruccionID = mysql.format(instruccionID);
                    //-- Establecer la comunicación con los Productos MAD de la base de datos.
                    madservicesAdmindb.query(formatoInstruccionID, (error, salida5) => {
                        if(error) throw error;
                        //-- Instrucción del ID.
                        let instruccionID = 'SELECT * FROM productos';
                        //-- Configuración de su formato en mysql.
                        let formatoInstruccionID = mysql.format(instruccionID);
                        //-- Establecer la comunicación con los Productos MAD de la base de datos.
                        madservicesAdmindb.query(formatoInstruccionID, (error, salida6) => {
                            if(error) throw error;
                            let sumaH = 0;
                            let sumaM = 0;
                            let sumaO = 0;
                            for(let j=0; j<salida1.length; j++) {
                                if(salida1[j].genero === 'Hombre') {
                                    sumaH = sumaH + 1;
                                }else if(salida1[j].genero === 'Mujer') {
                                    sumaM = sumaM + 1;
                                }else {
                                    sumaO = sumaO + 1;
                                }
                            }
                            let numTotalCarrito = 0;
                            let cantidadCarrito = 0;
                            for(let m=0; m<salida5.length; m++) {
                                numTotalCarrito = parseInt(salida5[m].total_cantidad, 10);
                                cantidadCarrito = cantidadCarrito + numTotalCarrito;
                            }
                            let ganancias = 0;
                            for(let n=0; n<result.length; n++) {
                                let preciototalInt = parseInt(result[n].preciototal, 10);
                                ganancias = ganancias + preciototalInt;
                            }
                            let cantidadQueHay = 0;
                            for(let h=0; h<salida6.length; h++) {
                                let cantidadInt = parseInt(salida6[h].cantidad, 10);
                                cantidadQueHay = cantidadQueHay + cantidadInt;
                            }
                            res.status(201).render('paginas/miembros/interfaz',
                            {
                                id: id,
                                email: salida3[0].email,
                                password: salida3[0].password,
                                miembro: salida3[0].miembro,
                                departamento: salida3[0].departamento,
                                genero: salida3[0].genero,
                                productosMadComprados: result,
                                totalComprados: result.length,
                                ganancias: ganancias,
                                numHombres: sumaH,
                                numMujeres: sumaM,
                                numOtros: sumaO,
                                cardH: cardH,
                                cardM: cardM,
                                cardO: cardO,
                                sumaRest: sumaRest,
                                sumaAca: sumaAca,
                                sumaCom: sumaCom,
                                sumaPeluq: sumaPeluq,
                                numMiembrosDireccion: miembrosDireccion,
                                numMiembrosAdministracion: miembrosAdministracion,
                                numMiembrosCiberseguridad: miembrosCiberseguridad,
                                numMiembrosIngenieria: miembrosIngenieria,
                                numMiembrosRRHH: miembrosRRHH,
                                numMiembrosVentas: miembrosVentas,
                                numMiembrosEconomia: miembrosEconomia,
                                fullCarrito: salida5,
                                cantidadCarrito: cantidadCarrito,
                                cantidadQueHay: cantidadQueHay
                            });
                            return res.end();
                        });
                    });
                });
            });
        });
    });
}

//-- Función que muestra los productos MAD.
const mostrarExpansionMiembrosdb = (id, enumeracion, res) => {
    
    //-- Instrucción que muestra productos MAD.
    let instruccionMuestraExpansionGeneral = 'SELECT * FROM productos WHERE enumeracion = ?';
    //-- Formato de la instrucción que muestra productos MAD.
    let formatoInstruccionMuestraExpansionGeneral = mysql.format(instruccionMuestraExpansionGeneral, [enumeracion]);
    //-- Establecemos la conexión con la base de datos.
    madservicesAdmindb.query(formatoInstruccionMuestraExpansionGeneral, (error, results) => {
        if(error) throw error;
        let instruccionMuestraMasArchivos = 'SELECT * FROM multimedia WHERE enumeracion = ?';
        let formatoInstruccionMuestraMasArchivos = mysql.format(instruccionMuestraMasArchivos, [enumeracion]);
        madservicesAdmindb.query(formatoInstruccionMuestraMasArchivos, (error, results1) => {
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
                res.status(201).render('paginas/miembros/expansion', 
                { 
                    id: id,
                    enumeracion: enumeracion,
                    titulo: results[0].titulo,
                    precio: results[0].precio,
                    peso: results[0].peso,
                    cantidad: results[0].cantidad,
                    categoria: results[0].producto,
                    descripcion: results[0].descripcion,
                    imagenPortada: results[0].portada,
                    multimedia: imagenes
                });
                return res.end();
            }else {
                res.status(201).render('paginas/miembros/expansion', 
                { 
                    id: id,
                    enumeracion: enumeracion,
                    titulo: results[0].titulo,
                    precio: results[0].precio,
                    peso: results[0].peso,
                    cantidad: results[0].cantidad,
                    categoria: results[0].producto,
                    descripcion: results[0].descripcion,
                    imagenPortada: results[0].portada
                });
                return res.end();
            }
        });
    });
}

//-- Función que muestra los productos MAD.
const mostrarProductosMADmiembrosdb = (id, res) => {
    
    //-- Instrucción que muestra productos MAD.
    let instruccionMuestraProductosMAD = 'SELECT * FROM productos';
    //-- Formato de la instrucción que muestra productos MAD.
    let formatoInstruccionMuestraProductosMAD = mysql.format(instruccionMuestraProductosMAD);
    //-- Establecemos la conexión con la base de datos.
    madservicesAdmindb.query(formatoInstruccionMuestraProductosMAD, (error, results) => {
        if(error) throw error;
        res.status(201).render('paginas/miembros/productosmadservices', { cartaProducto: results, id: id });
        return res.end();
    });
}

//-- Función que muestra los productos Multimarca o The Mall.
const mostrarProductosTheMallMiembroMADdb = (id, res) => {
    
    //-- Renderizar la Página de The Mall.
    res.status(201).render('paginas/miembros/productosTheMall', {id: id});
}

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = {
    mostrarMiembrodb,
    mostrarExpansionMiembrosdb,
    mostrarProductosMADmiembrosdb,
    mostrarProductosTheMallMiembroMADdb
};
//#######################################################################################################//