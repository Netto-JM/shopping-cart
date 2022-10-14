const fetchProducts = async (QUERY) => {
  if (!QUERY) throw new Error('You must provide an url');
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
