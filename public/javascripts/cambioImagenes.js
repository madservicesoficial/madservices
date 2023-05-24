// Obtener los elementos DOM para el carrusel de imágenes
const carousel = document.querySelector(".carousel");
const images = document.querySelectorAll(".bucleImages");
const buttons = document.querySelectorAll(".cambiarImagen");
let imageIndex = 1;
let intervalId;
// Una función que actualiza la visualización del carrusel para mostrar la imagen especificada
const slideImage = () => {
  // Calcular el índice de imagen actualizado
  imageIndex = imageIndex === images.length ? 0 : imageIndex < 0 ? images.length - 1 : imageIndex;
  // Actualizar la visualización del carrusel para mostrar la imagen especificada
  carousel.style.transform = `translate(-${imageIndex * 100}%)`;
};
// Una función que actualiza la visualización del carrusel para mostrar la imagen siguiente o anterior
const updateClick = (e) => {
  // Calcular el índice de imagen actualizado en función del botón pulsado
  imageIndex += e.target.id === "next" ? 1 : -1;
  slideImage(imageIndex);
};
// Agregar event listeners a los botones de navegación
buttons.forEach((button) => button.addEventListener("click", updateClick));