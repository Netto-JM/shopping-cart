const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {

  it('testa se saveCartItems é uma função', () => {
    expect(saveCartItems).toBeInstanceOf(Function);
  })

});
