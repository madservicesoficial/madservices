//-- Importamos las funciones de operaciones de Clientes para interactuar con la base de datos.
const {quitarProductosdb} = require('../../modelos/clientes/operacionesDB.js');

//-- Pto de control del ajuste del carrito de compra.
const quitarProductos = (req, res) => {
    
    //-- Obtenemos el ID del Cliente.
    let id = req.params.id;
    //-- Obtenemos el título del producto a eliminar del carrito.
    const titulo = req.body.titulo;
    //-- Proceso de quitar el producto del carrito.
    quitarProductosdb(id, titulo, res);
}

//-- Exportamos para unir con el resto de rutas.
module.exports = quitarProductos;