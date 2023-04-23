//-- Importamos las funciones de operaciones de los Clientes para interactuar con la base de datos.
const { darseBajaClientedb } = require('../../modelos/clientes/operacionesDB.js');
//-- Importamos la función para sacar y mostrar los campos del cliente.
const mostrarClientedb = require('../../modelos/clientes/mostrarCampos.js');

//-- Creamos el Punto de Control para configurar el darse de baja del cliente.
const darseBajaCliente = {}

darseBajaCliente.perfil = async (req, res) => {

    //-- Obtenemos el parámetro del ID cliente.
    let id = req.params.id;
    //-- Obtenemos las ctes que confirman si quieren darse de baja o no.
    const siConfirmo = req.body.siConfirmar;
    const noConfirmo = req.body.noConfirmar;
    //-- Si dejamos en blanco la confirmación de darse de baja, que avise de que debe confirmar.
    if(!siConfirmo && !noConfirmo) {
        mostrarClientedb
        (
            id,
            (tablaClientes) => {
                res.status(401).render('paginas/clientes/perfil', 
                {
                    msjError2: 'Debes confirmar si quieres o no darte de baja',
                    id: tablaClientes.id,
                    nombre: tablaClientes.nombre,
                    apellidos: tablaClientes.apellidos,
                    genero: tablaClientes.genero,
                    email: tablaClientes.email,
                    password: tablaClientes.password,
                    direccion: tablaClientes.direccion,
                    poblacion: tablaClientes.poblacion,
                    region: tablaClientes.region,
                    pais: tablaClientes.pais,
                    cp: tablaClientes.cp
                });
                return res.end();
            }
        );
    }else if(siConfirmo && noConfirmo) {
        mostrarClientedb
        (
            id,
            (tablaClientes) => {
                res.status(401).render('paginas/clientes/perfil', 
                {
                    msjError2: 'Debes elegir sólo una opción de confirmación',
                    id: tablaClientes.id,
                    nombre: tablaClientes.nombre,
                    apellidos: tablaClientes.apellidos,
                    genero: tablaClientes.genero,
                    email: tablaClientes.email,
                    password: tablaClientes.password,
                    direccion: tablaClientes.direccion,
                    poblacion: tablaClientes.poblacion,
                    region: tablaClientes.region,
                    pais: tablaClientes.pais,
                    cp: tablaClientes.cp
                });
                return res.end();
            }
        );
    }else if(!siConfirmo && noConfirmo) {
        mostrarClientedb
        (
            id,
            (tablaClientes) => {
                res.status(201).render('paginas/clientes/perfil', 
                {
                    msjBaja: 'Has pulsado que no quieres darte de baja',
                    id: tablaClientes.id,
                    nombre: tablaClientes.nombre,
                    apellidos: tablaClientes.apellidos,
                    genero: tablaClientes.genero,
                    email: tablaClientes.email,
                    password: tablaClientes.password,
                    direccion: tablaClientes.direccion,
                    poblacion: tablaClientes.poblacion,
                    region: tablaClientes.region,
                    pais: tablaClientes.pais,
                    cp: tablaClientes.cp
                });
                return res.end();
            }
        );
    }else if(siConfirmo && !noConfirmo) {
        //-- Procedemos a dar de baja al cliente definitivamente.
        darseBajaClientedb
        (
            id,
            req,
            res
        );
    }
}

//-- Exportamos la configuración del darse de baja del cliente para unificarlo con el resto de rutas.
module.exports = darseBajaCliente;