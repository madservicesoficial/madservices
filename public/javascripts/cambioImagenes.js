// Obtener los elementos DOM para el carrusel de imágenes
const carousel = document.querySelector(".carousel");
const imagenes = document.querySelectorAll(".bucleImages");
const botones = document.querySelectorAll(".cambiarImagen");
let i = 1;

// Una función que actualiza la visualización del carrusel para mostrar la imagen especificada
const carruselImagen = () => {
  // Calcular el índice de imagen actualizado
  if(i === imagenes.length) {
    i = 0;
  }else if(i < 0) {
    i = imagenes.length - 1;
  }else {
    i = i;
  }
  // Actualizar la visualización del carrusel para mostrar la imagen especificada
  carousel.style.transform = `translate(-${i * 100}%)`;
};
// Una función que actualiza la visualización del carrusel para mostrar la imagen siguiente o anterior
const actualizarAlClick = (e) => {
  // Calcular el índice de imagen actualizado en función del botón pulsado
  if(e.target.id === "next") {
    i += 1;
  }else {
    i -= 1;
  }
  carruselImagen(i);
};
// Agregar event listeners a los botones de navegación
botones.forEach((button) => button.addEventListener("click", actualizarAlClick));