require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {

  it('testa se fetchProducts é uma função', () => {
    expect(fetchProducts).toBeInstanceOf(Function);
  })

  it('testa se fetch foi chamada ao executar fetchProducts com o argumento "computador"', async () => {
    expect.assertions(1);
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  }) 
  
  it('testa se fetch usa o endpoint correto ao executar fetchProducts com o argumento "computador"', async () => {
    expect.assertions(1);
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  }) 
  
  it('testa se o retorno da função fetchProducts com o argumento "computador" é correto', async () => {
    expect.assertions(1);
    const fetchedProducts = await fetchProducts('computador');
    expect(fetchedProducts).toEqual(computadorSearch);
  })

  it('testa se, ao chamar a função fetchProducts sem argumento, retorna o erro correto', async () => {
    expect.assertions(1);
    await expect(fetchProducts())
      .rejects
      .toThrow('You must provide an url');
  })
  
});
