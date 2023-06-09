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

  it('testa se fetch usa o endpoint correto ao executar fetchItem com o argumento "MLB1615760527"', async () => {
    expect.assertions(1);
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  })

  it('testa se o retorno da função fetchItem com o argumento "MLB1615760527" é correto', async () => {
    expect.assertions(1);
    const fetchedItem = await fetchItem('MLB1615760527');
    expect(fetchedItem).toEqual(item);
  })

  it('testa se, ao chamar a função fetchItem sem argumento, retorna o erro correto', async () => {
    expect.assertions(1);
    await expect(fetchItem())
      .rejects
      .toThrow('You must provide an url');
  })

});
