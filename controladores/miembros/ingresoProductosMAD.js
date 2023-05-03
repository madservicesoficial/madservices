//-- Importamos la función que verifica que el producto introducido sigue con lo establecido.
const verificarProductosmetidos = require('../../validaciones/miembros/validacionIngreso.js');

//-- Creamos el Punto de Control para configurar el ingreso de productos MAD.
const ingresoProductosMAD = (req, res) => {

    //-- Introducción de los campos para ingresar 1 producto.
    let id = req.params.id;
    const cantidad = req.body.cantidad;
    const categoria = req.body.categoria;
    const titulo = req.body.titulo;
    const precio = req.body.precio;
    const peso = req.body.peso;
    const descripcion = req.body.descripcion;

    //-- Verificamos los campos introducidos.
    verificarProductosmetidos
    (
        id,
        {cantidad: cantidad, categoria: categoria, titulo: titulo, precio: precio, peso: peso, descripcion: descripcion},
        res
    );
}

//-- Exportamos la configuración del ingreso de productos MAD para unificarlo con el resto de rutas.
module.exports = ingresoProductosMAD;