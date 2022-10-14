const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {

  it('testa se saveCartItems é uma função', () => {
    expect(saveCartItems).toBeInstanceOf(Function);
  })

  it('testa se, ao executar saveCartItems com um cartItem como argumento, o método localStorage.setItem é chamado', () => {
    saveCartItems('someCartItem');
    expect(localStorage.setItem).toBeCalled();
  })

  it('testa se, ao executar saveCartItems com um cartItem como argumento, o método localStorage.setItem é chamado com dois parâmetros, sendo o primeiro a chave "cartItems" e o segundo sendo o valor passado como argumento para saveCartItems', () => {
    saveCartItems('someCartItem');
    expect(localStorage.setItem).toBeCalled('cartItems', 'someCartItem');
  })

});
