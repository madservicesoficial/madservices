//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const {madservicesAdmindb} = require('../../config/database.js');

//-- Creamos la función que saca los Productos MAD de la base de datos para verlos en la Interfaz del Miembro MAD.
const mostrarDatosdb = (id, email, password, miembro, departamento, genero, res) => {

    //-- Instrucción del ID.
    let instruccionID = 'SELECT * FROM productos';
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
                    let instruccionID = 'SELECT * FROM tarjeta';
                    //-- Configuración de su formato en mysql.
                    let formatoInstruccionID = mysql.format(instruccionID);
                    //-- Establecer la comunicación con los Productos MAD de la base de datos.
                    madservicesAdmindb.query(formatoInstruccionID, (error, salida4) => {
                        if(error) throw error;
                        //-- Instrucción del ID.
                        let instruccionID = 'SELECT titulo, SUM(cantidad) AS total_cantidad, SUM(precio * cantidad) AS total_precio FROM carrito GROUP BY titulo';
                        //-- Configuración de su formato en mysql.
                        let formatoInstruccionID = mysql.format(instruccionID);
                        //-- Establecer la comunicación con los Productos MAD de la base de datos.
                        madservicesAdmindb.query(formatoInstruccionID, (error, salida5) => {
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
                            res.status(201).render('paginas/miembros/interfaz',
                            {
                                id: id,
                                email: email,
                                password: password,
                                miembro: miembro,
                                departamento: departamento,
                                genero: genero,
                                todosProductosInterfaz: result,
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
                                numEmpresas: salida2.length,
                                numMiembrosDireccion: miembrosDireccion,
                                numMiembrosAdministracion: miembrosAdministracion,
                                numMiembrosCiberseguridad: miembrosCiberseguridad,
                                numMiembrosIngenieria: miembrosIngenieria,
                                numMiembrosRRHH: miembrosRRHH,
                                numMiembrosVentas: miembrosVentas,
                                numMiembrosEconomia: miembrosEconomia,
                                fullCarrito: salida5
                            });
                            return res.end();
                        });
                    });
                });
            });
        });
    });
}

//-- Exportamos las funciones.
module.exports = mostrarDatosdb;