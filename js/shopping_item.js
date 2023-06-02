import data from './store.js';
const shoppingTemplateID = document.querySelector('#shopping-template-id');
const shoppingContainer = document.querySelector('[data-shopping-container]');
export default function setupShopping() {
  data.forEach(renderShopping);
}
function renderShopping(item) {
  const cloned = shoppingTemplateID.content.cloneNode(true);
  const shoppingItemid = cloned.querySelector('[data-id]');
  shoppingItemid.dataset.id = item.id;
  const name = cloned.querySelector('[data-title]');
  name.innerText = item.name;
  const img = cloned.querySelector('[data-image]');
  img.src = item.imgUrl;
  const itemPrice = cloned.querySelector('[data-price]');
  itemPrice.innerText = item.price / 100;
  shoppingContainer.appendChild(cloned);
}
