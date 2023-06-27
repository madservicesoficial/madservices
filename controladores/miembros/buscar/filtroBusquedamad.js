//######################################### TECNOLOGÍAS USADAS ##########################################//
//-- Importamos la Tecnología para sacar la alerta/notificación.
const notifier = require('node-notifier');
//-- Importamos la Tecnología para encaminar a archivo a usar.
const path = require('path');
//#######################################################################################################//

//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { busquedaPorTitulodb, busquedaPorCategoriadb, busquedaPorPreciodb, busquedaPorCategoriaPreciodb,
busquedaPorTituloPreciodb, busquedaPorCategoriaTitulodb, busquedaPorTodo} = require('../../../modelos/miembros/buscar/buscar.js');
const { mostrarProductosMADmiembrosdb } = require('../../../modelos/miembros/mostrar/mostrar.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const filtroBusquedaMADMiembro = (req, res) => {

    //-- Variables y Ctes.
    let id = req.params.id;
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
        mostrarProductosMADmiembrosdb(id, res);
    }else if(!titulo && categoria === 'Todo' && precio !== 'Todos') {
        notifier.notify(
            {
                sound: true,
                wait: true,
                title: '¡Búsqueda!',
                message: `Buscando productos MAD entre ${min}€ y ${max}€`,
                icon: path.join(__dirname, '../../../public/images/buscar.png')
            }
        );
        busquedaPorPreciodb(min, max, res, id);
    }else if(!titulo && categoria !== 'Todo' && precio === 'Todos') {
        notifier.notify(
            {
                sound: true,
                wait: true,
                title: '¡Búsqueda!',
                message: `Buscando productos MAD por la categoria de ${categoria}`,
                icon: path.join(__dirname, '../../../public/images/buscar.png')
            }
        );
        busquedaPorCategoriadb(categoria, res, id);
    }else if(!titulo && categoria !== 'Todo' && precio !== 'Todos') {
        notifier.notify(
            {
                sound: true,
                wait: true,
                title: '¡Búsqueda!',
                message: `Buscando productos MAD por la categoria de ${categoria} entre ${min}€ y ${max}€`,
                icon: path.join(__dirname, '../../../public/images/buscar.png')
            }
        );
        busquedaPorCategoriaPreciodb(categoria, min, max, res, id);
    }else if(titulo && categoria === 'Todo' && precio === 'Todos') {
        notifier.notify(
            {
                sound: true,
                wait: true,
                title: '¡Búsqueda!',
                message: `Buscando productos MAD por el título de ${titulo}`,
                icon: path.join(__dirname, '../../../public/images/buscar.png')
            }
        );
        busquedaPorTitulodb(titulo, res, id);
    }else if(titulo && categoria === 'Todo' && precio !== 'Todos') {
        notifier.notify(
            {
                sound: true,
                wait: true,
                title: '¡Búsqueda!',
                message: `Buscando productos MAD por el título de ${titulo} entre ${min}€ y ${max}€`,
                icon: path.join(__dirname, '../../../public/images/buscar.png')
            }
        );
        busquedaPorTituloPreciodb(titulo, min, max, res, id);
    }else if(titulo && categoria !== 'Todo' && precio === 'Todos') {
        notifier.notify(
            {
                sound: true,
                wait: true,
                title: '¡Búsqueda!',
                message: `Buscando productos MAD por el título de ${titulo} y la categoria de ${categoria}`,
                icon: path.join(__dirname, '../../../public/images/buscar.png')
            }
        );
        busquedaPorCategoriaTitulodb(categoria, titulo, res, id);
    }else if(titulo && categoria !== 'Todo' && precio !== 'Todos') {
        notifier.notify(
            {
                sound: true,
                wait: true,
                title: '¡Búsqueda!',
                message: `Buscando productos MAD por el título de ${titulo}, la categoria de ${categoria} y entre ${min}€ y ${max}€`,
                icon: path.join(__dirname, '../../../public/images/buscar.png')
            }
        );
        busquedaPorTodo(categoria, titulo, min, max, res, id);
    }
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = filtroBusquedaMADMiembro;
//#######################################################################################################//