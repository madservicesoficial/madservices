//##################################### FUNCIONES EN BASE DE DATOS ######################################//
const { iniciarSesionEmpresaVerificadadb } = require('../../../modelos/empresas/entrada/entrada.js');
//#######################################################################################################//

//############################################# DESARROLLO ##############################################//
const iniciarSesionEmpresas = (req, res) => {

    //-- Variables y Ctes.
    const email = req.body.email;
    const password = req.body.password;
    //-- Proceso de validación.
    if(!email || !password) {
        //-- Renderizar y mostrar mensaje.
        res.status(401).render('paginas/empresas/login', {mensaje: 'Campos vacíos'});
        return res.end();
    }else {
        //-- Llamada a función.
        iniciarSesionEmpresaVerificadadb
        (
            email,
            password,
            req,
            res
        );
    }
}
//#######################################################################################################//

//########################################### PUNTO DE UNIÓN ############################################//
module.exports = iniciarSesionEmpresas;
//#######################################################################################################//