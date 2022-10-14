require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {

  it('testa se fetchItem é uma função', () => {
    expect(fetchItem).toBeInstanceOf(Function);
  })

  it('testa se fetch foi chamada ao executar fetchItem com o argumento "MLB1615760527"', async () => {
    expect.assertions(1);
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  })
  
});
