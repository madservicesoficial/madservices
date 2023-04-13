//-- Conectamos el canvas con su programación.
const lienzoMAD = document.getElementById('marcaMAD');

//-- Definimos el tamaño del lienzo.
lienzoMAD.width = 400;
lienzoMAD.height = 400;

//-- Obtener el contexto del lienzo.
const ctxMAD = lienzoMAD.getContext("2d");

//-- Leemos la imagen 2D introducida.
var logoCanvasMad = document.getElementById('imgMAD');

//-- Definimos el tamaño de la imagen.
const ancho1 = 100;
const alto1 = 100;

//-- Posiciones del elemento a animar.
let x1 = 0;
let y1 = 0;

//-- Velocidades del elemento a animar.
let velX1 = 6;
let velY1 = 4;

//-- Función del mvto de la imagen.
function movimientoMAD() 
{
    //-- Implementación del algoritmo de animación:

    //-- 1) Rebotes con los extremos:
    //-- Verticales:
    if(x1 < 0 || x1 >= (lienzoMAD.width - ancho1) ) {
        velX1 = -velX1;
    }
    //-- Horizontales:
    if(y1 < 0 || y1 >= (lienzoMAD.height - alto1)) {
        velY1 = -velY1;
    }

    //-- 2) Actualizar posicion de los elementos
    x1 = x1 + velX1;
    y1 = y1 + velY1;

    //-- 3) Borrar el canvas
    ctxMAD.clearRect(0, 0, lienzoMAD.width, lienzoMAD.height);

    //-- 4) Cargamos la imagen en el lienzo.
    ctxMAD.drawImage(logoCanvasMad, x1,y1, ancho1, alto1);

    //-- 5) Repetir
    requestAnimationFrame(movimientoMAD);
}

//-- Llamada a la función.
movimientoMAD();