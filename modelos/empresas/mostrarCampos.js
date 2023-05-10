//-- Importamos las funciones que muestran otros campos de la interfaz de la empresa.
const mostrarDescripciondb = require('./mostrarDescripcion.js');
const mostrarInstagramdb = require('./mostrarInstagram.js');
const mostrarTwitterdb = require('./mostrarTwitter.js');
const mostrarWhatsappdb = require('./mostrarWhatsapp.js');
const mostrarDatosdb = require('./mostrarDatos.js');
const mostrarPagWebdb = require('./mostrarPagWeb.js');

//-- Creamos la función que saca parámetros de la base de datos de las Empresas.
const mostrarEmpresadb = async (req, res) => {

    //-- Leemos el ID de la Empresa en ese momento.
    let id = req.params.id;
    //-- Leemos toda la información a sacar de la interfaz de la empresa.
    const descripcion = await mostrarDescripciondb(id);
    const instagram = await mostrarInstagramdb(id);
    const twitter = await mostrarTwitterdb(id);
    const whatsapp = await mostrarWhatsappdb(id);
    const pagweb = await mostrarPagWebdb(id);
    mostrarDatosdb
    (
        id,
        (tablaEmpresa) => {
            res.status(201).render('paginas/empresas/interfaz', 
            {
                id: id,
                email: tablaEmpresa.email,
                password: tablaEmpresa.password,
                marca: tablaEmpresa.marca,
                nif: tablaEmpresa.nif,
                tipo: tablaEmpresa.tipo,
                ebitda: tablaEmpresa.ebitda,
                descripcion: descripcion,
                instagram: instagram,
                twitter: twitter,
                whatsapp: whatsapp,
                pagweb: pagweb
            });
            return res.end();
        }
    );
}

//-- Exportamos las funciones.
module.exports = mostrarEmpresadb;