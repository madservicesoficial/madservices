//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología para sacar la alerta/notificación.
const notifier = require('node-notifier');
//-- Importamos la Tecnología para encaminar a archivo a usar.
const path = require('path');
//#######################################################################################################//

//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { busquedaPorPreciodb, busquedaPorCategoriadb, busquedaPorCategoriaPreciodb, busquedaPorTitulodb,
busquedaPorTituloPreciodb, busquedaPorCategoriaTitulodb, busquedaPorTodo} = require('../../../modelos/general/buscar/buscar.js');
const { mostrarProductosMADdb } = require('../../../modelos/general/mostrar/mostrar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const filtroBusquedaMAD = (req, res) => {

    //-- Variables y Ctes.
    const titulo = req.body.titulo;
    const categoria = req.body.categoria;
    const precio = req.body.precio;
    let min;
    let max;
    //-- Condicionantes precio.
    if(precio !== 'Todos') {
        min = parseInt(precio, 10);
        if(min >= 0 && min <= 90) {
            max = min + 10;
        }else if(min >= 100 && min <= 175) {
            max = min + 25;
        }else if(min >= 200 && min <= 450) {
            max = min + 50;
        }else if(min >= 500 && min <= 900) {
            max = min + 100;
        }else {
            max = 9000000000;
        }
    }
    //-- Proceso de validación.
    if(!titulo && categoria === 'Todo' && precio === 'Todos') {
        notifier.notify(
            {
                sound: true,
                wait: true,
                title: '¡Búsqueda!',
                message: 'Todos los productos MAD',
                icon: path.join(__dirname, '../../../public/images/buscar.png')
            }
        );
        mostrarProductosMADdb(res);
    }else if(!titulo && categoria === 'Todo' && precio !== 'Todos') {
        busquedaPorPreciodb(min, max, res);
    }else if(!titulo && categoria !== 'Todo' && precio === 'Todos') {
        busquedaPorCategoriadb(categoria, res);
    }else if(!titulo && categoria !== 'Todo' && precio !== 'Todos') {
        busquedaPorCategoriaPreciodb(categoria, min, max, res);
    }else if(titulo && categoria === 'Todo' && precio === 'Todos') {
        busquedaPorTitulodb(titulo, res);
    }else if(titulo && categoria === 'Todo' && precio !== 'Todos') {
        busquedaPorTituloPreciodb(titulo, min, max, res);
    }else if(titulo && categoria !== 'Todo' && precio === 'Todos') {
        busquedaPorCategoriaTitulodb(categoria, titulo, res);
    }else if(titulo && categoria !== 'Todo' && precio !== 'Todos') {
        busquedaPorTodo(categoria, titulo, min, max, res);
    }
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = filtroBusquedaMAD;
//#######################################################################################################//