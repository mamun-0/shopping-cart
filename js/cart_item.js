const cartIcon = document.querySelector('[data-cart-icon]');
const cartItemsContainer = document.querySelector('.cart-items-container');
export default function setUpCart() {}

cartIcon.addEventListener('click', function () {
  cartItemsContainer.classList.toggle('d-none');
});
