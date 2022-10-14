const fetchItem = async (ItemID) => {
  if (!ItemID) throw new Error('You must provide an url');
  const endpoint = `https://api.mercadolibre.com/items/${ItemID}`;
  const result = await fetch(endpoint);
  const data = await result.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
