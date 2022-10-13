const fetchProducts = async (qry) => {
  if (!qry) throw new Error('You must provide an url');
  const QUERY = 'computador';
  const endpoint = `https://api.mercadolibre.com/sites/MLB/search?q=${QUERY}`;
  const result = await fetch(endpoint);
  const data = await result.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
