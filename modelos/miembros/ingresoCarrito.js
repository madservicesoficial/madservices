

//-- Creamos el pto de control para añadir artículos al carrito de la compra.
const ingresoCarrito = (req, res) => {

    //-- Pulsar añadir al carrito para comprarlo.
    const producto = req.body.producto;
    console.log(producto);
    //-- Creamos el Array: Carrito.
    const carrito = [];
    //-- Lanzamos el producto al carrito.
    carrito.push(producto);
}

//-- Exportamos dicha funcion para unirlo con el resto de rutas.
module.exports = ingresoCarrito;