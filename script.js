// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições! 

// Fique a vontade para modificar o código já escrito e criar suas próprias funções!

const cartItemListElement = document.querySelector('.cart__items');
const emptyCartBtnElement = document.querySelector('.empty-cart');
const totalPriceElement = document.querySelector('.total-price');
const loadingElement = document.querySelector('.loading');
const cartItems = [];
let totalPrice = 0;

const updatePrice = (price, isPositive) => {
  if (price === 0) totalPrice = 0;
  else totalPrice += isPositive ? price : -price;
  totalPrice = Math.abs(totalPrice);
  totalPriceElement.textContent = `R$ ${totalPrice.toFixed(2)}`;
};

const emptyCart = () => {
  while (cartItemListElement.firstChild) {
    cartItemListElement.removeChild(cartItemListElement.firstChild);
  }
  updatePrice(0);
  cartItems.length = 0;
  localStorage.removeItem('cartItems');
};

/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto. 
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */
const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
const getIdFromProductItem = (product) => product.querySelector('span.id').innerText;

const cartItemClickListener = (cartItem, price, neededInfo) => {
  cartItem.parentElement.removeChild(cartItem);
  updatePrice(price);
  cartItems.splice(cartItems.indexOf(neededInfo), 1);
  if (!cartItems.length) {
    localStorage.removeItem('cartItems');
    return;
  }
  saveCartItems(JSON.stringify(cartItems));
};

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */
const createCartItemElement = (neededInfo) => {
  const { id, title, price } = neededInfo;
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.addEventListener('click', (event) => {
    cartItemClickListener(event.target, price, neededInfo); 
  });
  updatePrice(price, true);
  return li;
};

const getNeededInfo = ({ id, title, price }) => ({ id, title, price });

const listedItemClickListener = async (itemId, savedInfo) => {
  const loadingCartItem = createCustomElement('h1', 'loading', 'carregando...');
  cartItemListElement.appendChild(loadingCartItem);
  const itemInfo = savedInfo || await fetchItem(itemId);
  cartItemListElement.removeChild(loadingCartItem);
  const neededInfo = getNeededInfo(itemInfo);
  const cartItemElement = createCartItemElement(neededInfo);
  cartItemListElement.appendChild(cartItemElement);
  cartItems.push(neededInfo);
  saveCartItems(JSON.stringify(cartItems));
};

const createProductListing = (searchResults) => {
  const itemsSectionEl = document.querySelector('.items');
  searchResults.forEach((result) => {
    const productItemElement = createProductItemElement(result);
    const addItemButton = productItemElement.querySelector('.item__add');
    addItemButton.addEventListener('click', () => { listedItemClickListener(result.id); });
    itemsSectionEl.appendChild(productItemElement);
  });
};

const buildSavedCartElements = (savedCartItems) => {
  const userCartItems = JSON.parse(savedCartItems);
  userCartItems.forEach((savedInfo) => { listedItemClickListener(savedInfo.id, savedInfo); });
};

window.onload = async () => { 
  const productList = await fetchProducts('computer');
  loadingElement.parentElement.removeChild(loadingElement);
  const { results } = productList;
  createProductListing(results);
  emptyCartBtnElement.addEventListener('click', emptyCart);
  const savedCartItems = getSavedCartItems();
  if (savedCartItems) buildSavedCartElements(savedCartItems);
};
