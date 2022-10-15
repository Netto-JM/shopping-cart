const saveCartItems = (itemsId) => {
  localStorage.setItem('cartItems', itemsId);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
