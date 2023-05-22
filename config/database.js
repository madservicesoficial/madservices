//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la configuración del entorno ENV para poder usar su información.
require('./env.js');

//-- Creamos la conexión con la base de datos de MAD Services y la establecemos de forma dinámica => Usuario: root.
const madservicesAdmindb = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_ADMIN,
    password: process.env.MYSQL_PASSWORD_ADMIN,
    database: process.env.MYSQL_DATABASE,
    port: process.env.PUERTO_DB
});

//-- Creamos la conexión con la base de datos de MAD Services y la establecemos de forma dinámica => Usuario: cliente.
const madservicesClientedb = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_CLIENTE,
    password: process.env.MYSQL_PASSWORD_CLIENTE,
    database: process.env.MYSQL_DATABASE,
    port: process.env.PUERTO_DB
});

//-- Creamos la conexión con la base de datos de MAD Services y la establecemos de forma dinámica => Usuario: empresa.
const madservicesEmpresadb = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_EMPRESA,
    password: process.env.MYSQL_PASSWORD_EMPRESA,
    database: process.env.MYSQL_DATABASE,
    port: process.env.PUERTO_DB
});

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = {
    madservicesAdmindb,
    madservicesClientedb,
    madservicesEmpresadb
};
//#######################################################################################################//