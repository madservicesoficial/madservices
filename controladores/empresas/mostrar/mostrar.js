//##################################### FUNCIONES EN BASE DE DATOS ######################################//
//#######################################################################################################//


//############################################# DESARROLLO ##############################################//
//#######################################################################################################//
const mostrarEmpresa = async (req, res) => {

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

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = mostrarEmpresa;
//#######################################################################################################//