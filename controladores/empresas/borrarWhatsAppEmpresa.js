//-- Importamos las funciones de operaciones de las Empresas para interactuar con la base de datos.
const { borrarWhatsAppEmpresadb } = require('../../modelos/empresas/operacionesDB.js');

//-- Creamos el Punto de Control para borrar el WhatsApp en la interfaz de la Empresa.
const borrarWhatsAppEmpresa = (req, res) => {

    //-- Introducción del WhatsApp en la interfaz de la Empresa para borrar en base de datos.
    let id = req.params.id;
    //-- Función borrar el campo.
    borrarWhatsAppEmpresadb(id, res);
}

//-- Exportamos la configuración de borrar el WhatsApp en la interfaz de la Empresa para unificarlo con el resto de rutas.
module.exports = borrarWhatsAppEmpresa;