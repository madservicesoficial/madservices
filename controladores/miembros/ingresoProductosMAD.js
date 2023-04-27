//-- Importamos las funciones de operaciones de los Miembros MAD para interactuar con la base de datos.
const { ingresarProductosMADdb } = require('../../modelos/miembros/operacionesDB.js');
const verificarProductosmetidos = require('../../validaciones/miembros/validacionIngreso.js');

//-- Creamos el Punto de Control para configurar el registro de los Clientes.
const ingresoProductosMAD = {}

ingresoProductosMAD.interfaz = (req, res) => {

    //-- Introducción de los campos para ingresar 1 producto.
    let id = req.params.id;
    const categoria = req.body.categoria;
    const titulo = req.body.titulo;
    const precio = req.body.precio;
    const peso = req.body.peso;
    const descripcion = req.body.descripcion;
    //-- Verificamos los campos introducidos.
    verificarProductosmetidos
    (
        id,
        {categoria: categoria, titulo: titulo, precio: precio, peso: peso, descripcion: descripcion},
        res
    );
    //-- Ingresamos los productos en la base de datos.
    ingresarProductosMADdb
    (
        {categoria: categoria, titulo: titulo, precio: precio, peso: peso, descripcion: descripcion},
        res
    );
}

//-- Exportamos la configuración de registro de los Miembros MAD para unificarlo con el resto de rutas.
module.exports = ingresoProductosMAD;