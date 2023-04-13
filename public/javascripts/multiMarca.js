//-- Conectamos el canvas con su programación.
const lienzoMulti = document.getElementById('multiMarca');

//-- Definimos el tamaño del lienzo.
lienzoMulti.width = 400;
lienzoMulti.height = 400;

//-- Obtener el contexto del lienzo.
const ctxMulti = lienzoMulti.getContext("2d");

//-- Leemos la imagen 2D introducida.
var logoCanvasMulti = document.getElementById('imgMulti');

//-- Definimos el tamaño de la imagen.
const ancho2 = 100;
const alto2 = 100;

//-- Posiciones del elemento a animar.
let x2 = 0;
let y2 = 0;

//-- Velocidades del elemento a animar.
let velX2 = 4;
let velY2 = 6;

//-- Función del mvto de la imagen.
function movimientoMulti() 
{
    //-- Implementación del algoritmo de animación:

    //-- 1) Rebotes con los extremos:
    //-- Verticales:
    if(x2 < 0 || x2 >= (lienzoMulti.width - ancho2) ) {
        velX2 = -velX2;
    }
    //-- Horizontales:
    if(y2 < 0 || y2 >= (lienzoMulti.height - alto2)) {
        velY2 = -velY2;
    }

    //-- 1) Actualizar posicion de los elementos
    x2 = x2 + velX2;
    y2 = y2 + velY2;

    //-- 2) Borrar el canvas
    ctxMulti.clearRect(0, 0, lienzoMulti.width, lienzoMulti.height);

    //-- Cargamos la imagen en el lienzo.
    ctxMulti.drawImage(logoCanvasMulti, x2,y2, ancho2, alto2);

    //-- 4) Repetir
    requestAnimationFrame(movimientoMulti);
}

//-- Llamada a la función.
movimientoMulti();