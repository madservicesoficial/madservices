//-- Creamos la función que crea el EBITDA y muestra la cuota a pagar.
const consultaEBITDA = {}

consultaEBITDA.registrarse = (req, res) => {

    //-- Relleno de las variables para crear el ebitda y cuota MAD.
    const ingresos = req.body.ingresos;
    const costes = req.body.costes;
    const gastos = req.body.gastos;
    const depreciacion = req.body.depreciacion;
    const amortizacion = req.body.amortizacion;
    //-- Comprobar que ningún campo está vacío.
    if(!ingresos || !costes || !gastos || !depreciacion || !amortizacion) {
        res.status(401).render('paginas/empresas/registrarse', {mensaje: 'Campos vacíos'});
        return res.end();
    }
    //-- Cálculo del EBITDA.
    const EBITDA = ingresos - costes - gastos + (depreciacion/100) + (amortizacion/100);
    //-- Cálculo de la cuota MAD.
    const cuotaMAD = (10 / 100) * EBITDA;
    //-- Sacar la cuota por salida.
    res.status(201).render('paginas/empresas/registrarse', 
    {
        mensaje: 'Cuota MAD actualizada',
        cuotaMAD: cuotaMAD
    });
    return res.end();
}

//-- Exportamos para unir con el resto del programa.
module.exports = consultaEBITDA;