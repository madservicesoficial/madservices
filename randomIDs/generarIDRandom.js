//-- Creamos la función para generar un ID aleatoriamente 
//-- para el Cliente o para la Empresa que se registre en MAD Services.
function generarIDrandom() {
    
    //-- Variable que almacena el ID aleatorio.
    const id = parseInt(Math.random() * 1000);

    //-- Sacarlo por salida.
    return id;
}

//-- Exportamos la función para usarla en diferentes ámbitos del E-Commerce.
module.exports = generarIDrandom;