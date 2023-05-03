//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const {madservicesAdmindb} = require('../../config/database.js');
//-- Importamos las funciones de operaciones de los Miembros MAD para interactuar con la base de datos.
const { ingresarProductosMADdb } = require('../../modelos/miembros/operacionesDB.js');
//-- Importamos la Tecnología para leer ficheros.
const fs = require('fs');
//-- Importamos la Tecnología para seguir la ruta a los archivos locales.
const path = require('path');
//-- Importamos la Tecnología para leer de forma asíncrona.
const util = require('util');

//-- Creamos la función que valida los campos de ingreso de los productos MAD.
const verificarProductosmetidos = async (id, data, res) => {

    //-- Declaramos ctes.
    const minlong = 3;
    const mintexto = 2 * minlong;
    const maxlong = 98;
    const maxtexto = 10 * maxlong;
    //-- Declaramos las variables o campos de ingreso de productos.
    const cantidad = data.cantidad;
    const categoria = data.categoria;
    const titulo = data.titulo;
    const precio = data.precio;
    const peso = data.peso;
    const descripcion = data.descripcion;
    //-- Comprobamos que no haya campos vacíos.
    if(!cantidad || !categoria || !titulo || !precio || !peso || !descripcion) {
        //-- Ruta al directorio de las imágenes almacenadas localmente.
        const rutaAlDirectorio = path.join(__dirname, '../../imagenes');
        //-- Fichero asíncrono leer directorio.
        const readdir = util.promisify(fs.readdir);
        //-- Fichero asíncrono borrar fichero.
        const unlink = util.promisify(fs.unlink);
        //-- Ruta donde está el archivo metido localmente.
        const files = await readdir(rutaAlDirectorio);
        const file = files[0];
        if(typeof file === 'string') {
            //-- Eliminación de las imágenes locales.
            let eliminarArchivo = path.join(rutaAlDirectorio, file);
            await unlink(eliminarArchivo);
        }
        //-- Instrucción consultar para mostrar.
        let instruccionConsultarParaMostrar = 'SELECT * FROM miembros WHERE id = ?';
        //-- Configuración del formato de la instrucción.
        let formatoinstruccionConsultarParaMostrar = mysql.format(instruccionConsultarParaMostrar, [id]);
        //-- Proceso de la consulta.
        madservicesAdmindb.query(formatoinstruccionConsultarParaMostrar, (error, fields) => {
            if(error) throw error;
            const tablaMiembro = fields[0];
            res.status(401).render('paginas/miembros/interfaz',
            {
                mensajeVerif: `Campos vacíos`,
                id: tablaMiembro.id,
                miembro: tablaMiembro.miembro,
                departamento: tablaMiembro.departamento,
                genero: tablaMiembro.genero,
                email: tablaMiembro.email,
                password: tablaMiembro.password
            });
            return res.end();
        });
    }else {
        if(titulo.length < minlong || titulo.length > maxlong) {
            //-- Instrucción consultar para mostrar.
            let instruccionConsultarParaMostrar = 'SELECT * FROM miembros WHERE id = ?';
            //-- Configuración del formato de la instrucción.
            let formatoinstruccionConsultarParaMostrar = mysql.format(instruccionConsultarParaMostrar, [id]);
            //-- Proceso de la consulta.
            madservicesAdmindb.query(formatoinstruccionConsultarParaMostrar, (error, field) => {
                if(error) throw error;
                const tablaMiembro = field[0];
                res.status(401).render('paginas/miembros/interfaz',
                {
                    mensajeVerif: 'Título demasiado largo',
                    id: tablaMiembro.id,
                    miembro: tablaMiembro.miembro,
                    departamento: tablaMiembro.departamento,
                    genero: tablaMiembro.genero,
                    email: tablaMiembro.email,
                    password: tablaMiembro.password
                });
                return res.end();
            });
        }else if(descripcion.length < mintexto || descripcion.length > maxtexto) {
            //-- Instrucción consultar para mostrar.
            let instruccionConsultarParaMostrar = 'SELECT * FROM miembros WHERE id = ?';
            //-- Configuración del formato de la instrucción.
            let formatoinstruccionConsultarParaMostrar = mysql.format(instruccionConsultarParaMostrar, [id]);
            //-- Proceso de la consulta.
            madservicesAdmindb.query(formatoinstruccionConsultarParaMostrar, (error, fields) => {
                if(error) throw error;
                const tablaMiembro = fields[0];
                res.status(401).render('paginas/miembros/interfaz',
                {
                    mensajeVerif: 'Descripción demasiada larga',
                    id: tablaMiembro.id,
                    miembro: tablaMiembro.miembro,
                    departamento: tablaMiembro.departamento,
                    genero: tablaMiembro.genero,
                    email: tablaMiembro.email,
                    password: tablaMiembro.password
                });
                return res.end();
            });
        }else if(cantidad < 1) {
            //-- Instrucción consultar para mostrar.
            let instruccionConsultarParaMostrar = 'SELECT * FROM miembros WHERE id = ?';
            //-- Configuración del formato de la instrucción.
            let formatoinstruccionConsultarParaMostrar = mysql.format(instruccionConsultarParaMostrar, [id]);
            //-- Proceso de la consulta.
            madservicesAdmindb.query(formatoinstruccionConsultarParaMostrar, (error, campo) => {
                if(error) throw error;
                const tablaMiembro = campo[0];
                res.status(401).render('paginas/miembros/interfaz',
                {
                    mensajeVerif: `No tiene sentido la cantidad ${cantidad}`,
                    id: tablaMiembro.id,
                    miembro: tablaMiembro.miembro,
                    departamento: tablaMiembro.departamento,
                    genero: tablaMiembro.genero,
                    email: tablaMiembro.email,
                    password: tablaMiembro.password
                });
                return res.end();
            });
        }else if(precio < 0) {
            //-- Instrucción consultar para mostrar.
            let instruccionConsultarParaMostrar = 'SELECT * FROM miembros WHERE id = ?';
            //-- Configuración del formato de la instrucción.
            let formatoinstruccionConsultarParaMostrar = mysql.format(instruccionConsultarParaMostrar, [id]);
            //-- Proceso de la consulta.
            madservicesAdmindb.query(formatoinstruccionConsultarParaMostrar, (error, campos) => {
                if(error) throw error;
                const tablaMiembro = campos[0];
                res.status(401).render('paginas/miembros/interfaz',
                {
                    mensajeVerif: 'Pon un precio correcto',
                    id: tablaMiembro.id,
                    miembro: tablaMiembro.miembro,
                    departamento: tablaMiembro.departamento,
                    genero: tablaMiembro.genero,
                    email: tablaMiembro.email,
                    password: tablaMiembro.password
                });
                return res.end();
            });
        }else {
            //-- Ingresamos los productos en la base de datos.
            ingresarProductosMADdb
            (
                id,
                {cantidad: cantidad, categoria: categoria, titulo: titulo, precio: precio, peso: peso, descripcion: descripcion},
                res
            );
        }
    }
}

//-- Exportamos dicha función para unirlo al resto del programa.
module.exports = verificarProductosmetidos;