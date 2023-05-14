//-- Importamos las funciones de operaciones de Clientes para interactuar con la base de datos.
const {ingresoCarritodb} = require('../../modelos/clientes/operacionesDB.js');

//-- Pto de control del ajuste del carrito de compra.
const ingresoCarrito = (req, res) => {
    
    //-- Obtenemos el ID del Cliente.
    let id = req.params.id;
    //-- Guardamos el valor del producto MAD que se ha clickado.
    const enumeracion = req.body.enumeracion;
    const numProducto = parseInt(enumeracion, 10);
    //-- Consultar nº en base de datos.
    ingresoCarritodb(numProducto, res, id);
}

//-- Exportamos para unir con el resto de rutas.
module.exports = ingresoCarrito;