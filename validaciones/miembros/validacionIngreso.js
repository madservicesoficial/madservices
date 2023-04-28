//-- Importamos la versión 2 de la Tecnología MySQL, que tiene mejores características y más rango de actuación,
//-- para conectarnos a la base de datos de MAD Services.
const mysql = require('mysql2');
//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const {madservicesAdmindb} = require('../../config/database.js');
//-- Importamos las funciones de operaciones de los Miembros MAD para interactuar con la base de datos.
const { ingresarProductosMADdb } = require('../../modelos/miembros/operacionesDB.js');
//-- Importamos la Tecnología para almacenar en directorio.
const almacenaje = require('multer');

//-- Creamos la función que valida los campos de ingreso de los productos MAD.
const verificarProductosmetidos = (id, imagenes, data, res) => {

    const minlong = 3;
    const mintexto = 2 * minlong;
    const maxlong = 98;
    const maxtexto = 10 * maxlong;
    //-- Comprobamos que no haya campos vacíos.
    if(!data.categoria || !data.titulo || !data.precio || !data.peso || !data.descripcion) {
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
        //-- Subir la imagen en su espacio de memoria.
        const almacenamiento = almacenaje.diskStorage({
            destination: function (req, file, cb) {
                cb(null, 'public/vistaProductos/');
                console.log('destination');
            },
            filename: function (req, file, cb) {
                cb(null, file.originalname);
                console.log('filename');
            }
        });
        const subirImagen = almacenaje({almacenamiento: almacenamiento});
        subirImagen.array(imagenes, 10);
        if(data.titulo.length < minlong || data.titulo.length > maxlong) {
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
                    mensajeVerif: `No pongas un título de más de ${maxlong}`,
                    id: tablaMiembro.id,
                    miembro: tablaMiembro.miembro,
                    departamento: tablaMiembro.departamento,
                    genero: tablaMiembro.genero,
                    email: tablaMiembro.email,
                    password: tablaMiembro.password
                });
                return res.end();
            });
        }
        if(data.descripcion.length < mintexto || data.descripcion.length > maxtexto) {
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
                    mensajeVerif: `No pongas una descripción de más de ${maxtexto}`,
                    id: tablaMiembro.id,
                    miembro: tablaMiembro.miembro,
                    departamento: tablaMiembro.departamento,
                    genero: tablaMiembro.genero,
                    email: tablaMiembro.email,
                    password: tablaMiembro.password
                });
                return res.end();
            });
        }
        //-- Declaramos las variables o campos de ingreso de productos.
        const categoria = data.categoria;
        const titulo = data.titulo;
        const precio = data.precio;
        const peso = data.peso;
        const descripcion = data.descripcion;
        //-- Ingresamos los productos en la base de datos.
        ingresarProductosMADdb
        (
            id,
            {categoria: categoria, titulo: titulo, precio: precio, peso: peso, descripcion: descripcion},
            res
        );
    }
}

//-- Exportamos dicha función para unirlo al resto del programa.
module.exports = verificarProductosmetidos;