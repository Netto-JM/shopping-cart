const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {

  it('testa se getSavedCartItems é uma função', () => {
    expect(getSavedCartItems).toBeInstanceOf(Function);
  })

});
