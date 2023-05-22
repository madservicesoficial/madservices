//-- Importamos las funciones de operaciones de las Empresas para interactuar con la base de datos.
const { ingresoWhatsAppEmpresadb } = require('../../modelos/empresas/operacionesDB.js');

//-- Creamos el Punto de Control para ingresar el WhatsApp en la interfaz de la Empresa.
const ingresoWhatsAppEmpresa = (req, res) => {

    //-- Introducción del WhatsApp en la interfaz de la Empresa para ingresar en base de datos.
    let id = req.params.id;
    const whatsapp = req.body.whatsapp;
    //-- Función ingresar el campo.
    ingresoWhatsAppEmpresadb(id, whatsapp, res);
}

//-- Exportamos la configuración de ingresar el WhatsApp en la interfaz de la Empresa para unificarlo con el resto de rutas.
module.exports = ingresoWhatsAppEmpresa;