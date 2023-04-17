//-- Importamos la conexión con la base de datos poder establecer diferentes operaciones con ella.
const madservicesdb = require('../config/database.js');

//-- Creamos el Punto de Control para configurar la posibilidad de mostrar datos de las Empresas.
const mostrarPerfilEmpresa = {}

mostrarPerfilEmpresa.perfilEmpresas = (req, res) => {

}

//-- Exportamos la configuración de la posibilidad de mostrar datos de las Empresas para unificarlo con el resto de rutas.
module.exports = mostrarPerfilEmpresa;