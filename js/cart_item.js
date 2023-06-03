const cartIcon = document.querySelector('[data-cart-icon]');
const cartItemsContainer = document.querySelector('.cart-items-container');
const cartTemplateID = document.querySelector('#cart-template-id');
const cartItemCount = document.querySelector('.cart-item-count');
import data from './store.js';
let storeItems = [];
export default function setUpCart() {
  renderCart();
}

export function addToCart(id) {
  const existingElement = storeItems.find((e) => e.id === id);
  if (existingElement) {
    existingElement.quantity++;
  } else {
    storeItems.push({ id, quantity: 1 });
  }
  renderCart();
}

function renderCart() {
  cartItemsContainer.innerHTML = '';
  cartItemCount.innerText = storeItems.length;
  cartItemsContainer.appendChild(totalDivDesign(calculateTotal() / 100));
  storeItems.forEach((element) => {
    const item = data.find((findItem) => element.id === findItem.id);
    if (item) {
      const cloned = cartTemplateID.content.cloneNode(true);
      const cartItemID = cloned.querySelector('[data-id]');
      cartItemID.dataset.id = item.id;
      const name = cloned.querySelector('[data-title]');
      name.innerText = `${item.name} x${element.quantity}`;
      const img = cloned.querySelector('[data-image]');
      img.src = item.imgUrl;
      const itemPrice = cloned.querySelector('[data-price]');
      itemPrice.innerText = '$' + item.price / 100;
      cartItemsContainer.prepend(cloned);
    }
  });
}

function totalDivDesign(total = 0) {
  const div = document.createElement('div');
  div.className = `d-flex justify-content-between mt-auto p-3 border-top`;
  const h3_1 = document.createElement('h3');
  h3_1.className = 'lead';
  h3_1.innerText = 'Total';
  const h3_2 = document.createElement('h3');
  h3_2.className = 'lead';
  h3_2.innerText = `$${total}`;
  div.appendChild(h3_1);
  div.appendChild(h3_2);
  return div;
}

function calculateTotal() {
  return storeItems.reduce((sum, item) => {
    const foundItem = data.find((e) => e.id === item.id);
    return sum + foundItem.price * item.quantity;
  }, 0);
}
function removeItem(id) {
  storeItems = storeItems.filter((e) => !(e.id === id));
  renderCart();
}

cartIcon.addEventListener('click', function () {
  cartItemsContainer.classList.toggle('d-none');
});

document.addEventListener('click', function (e) {
  const removeElement = e.target.classList.contains('cart-item-remove');
  if (removeElement) {
    const id = e.target.closest('[data-id]').dataset.id;
    removeItem(+id);
  }
});
