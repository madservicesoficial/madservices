//-- Importamos las funciones de operaciones de los Clientes para interactuar con la base de datos.
const { ingresarTarjetaBankdb, adquirirNombredb } = require('../../modelos/clientes/operacionesDB.js');
//-- Importamos la Tecnología que crea los cuadros de alertas emergentes.
const alerta = require('alert');
//-- Importamos la Tecnología para validar datos de la tarjeta bancaria del cliente.
const validarCard = require('card-validator');

//-- Creamos el Punto de Control para configurar el ingreso de la tarjeta bancaria del cliente.
const ingresarTarjetaBank = async (req, res) => {

    //-- Obtenemos el parámetro del ID cliente.
    let id = req.params.id;
    //-- Obtenemos las ctes que confirman el ingreso o no la tarjeta bancaria.
    const ingresaCard = req.body.ingresaCard;
    const numtarjeta = req.body.tarjetab;
    const validez = req.body.fvalidez;
    let namecard = req.body.nombrecard;
    const cvv = req.body.cvvcod;
    //-- Si no pone nombre, se pone el de su perfil.
    if(!namecard) {
        namecard = await adquirirNombredb(id);
    }
    //-- Proceso de comprobar que no haya campos vacíos.
    if(!numtarjeta || !validez || !cvv) {
        //-- Mostrar alerta.
        alerta('Campos vacíos');
        //-- Redirigir.
        return res.redirect(`/sesion-cliente/${id}/perfil`);
    }else {
        //-- Validaciones de la tarjeta bancaria.
        //-- Configuramos bien la fecha de expiración.
        const newExpiracion = validez + '-01';
        //-- Validamos el nº de tarjeta bancaria y el cvv.
        const validacionCard = validarCard.number(numtarjeta);
        const validacionCVV = validarCard.cvv(cvv);
        if(namecard > 148) {
            //-- Mostrar alerta y redirigir a donde estaba de nuevo.
            alerta(`${namecard} demasiado largo`);
            return res.redirect(`/sesion-cliente/${id}/perfil`);
        }else if(!validacionCard.isValid || numtarjeta.length > 18) {
            //-- Mostrar alerta y redirigir a donde estaba de nuevo.
            alerta(`${numtarjeta} es un nº de tarjeta bancaria inválido`);
            return res.redirect(`/sesion-cliente/${id}/perfil`);
        }else if(!validacionCVV.isValid) {
            //-- Mostrar alerta y redirigir a donde estaba de nuevo.
            alerta(`${cvv} es un código CVV inválido`);
            return res.redirect(`/sesion-cliente/${id}/perfil`);
        }else {
            //-- Proceso de ingresar la tarjeta bancaria.
            if(ingresaCard) {
                ingresarTarjetaBankdb(id, numtarjeta, newExpiracion, namecard, cvv, res);
            }else {
                //-- Mostrar alerta.
                alerta('Sin pulsar el cuadro, no hay ingreso de la tarjeta bancaria');
                //-- Redirigir.
                return res.redirect(`/sesion-cliente/${id}/perfil`);
            }
        }
    }
}

//-- Exportamos la configuración para unificarlo con el resto de rutas.
module.exports = ingresarTarjetaBank;