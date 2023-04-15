const btnCarrito = document.querySelector('#btnCarrito');
const btnCarritoHaciaAbajo = document.querySelector('#carritoHaciaAbajo');

btnCarrito.addEventListener('click', () => {
    btnCarritoHaciaAbajo.classList.toggle('show');
});

document.addEventListener('click', (event) => {
  if (!btnCarrito.contains(event.target) && !btnCarritoHaciaAbajo.contains(event.target)) {
    btnCarritoHaciaAbajo.classList.remove('show');
  }
});