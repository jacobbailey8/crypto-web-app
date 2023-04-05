const API_BASE = 'https://api.coingecko.com/api/v3'

const trending = async () => {
  let res = await fetch(`${API_BASE}/search/trending`)
  let data = await res.json()
  return data.coins
}

const singleCoinData = async (id) => {
  let res = await fetch(`${API_BASE}/coins/${id}`)
  let data = await res.json()
  return data
}

const getChartData = async (id) => {
  let res = await fetch(`${API_BASE}/coins/${id}/market_chart?vs_currency=usd&days=365`);
  let data = await res.json();
  let full = data.prices;
  return full;

}

export { trending, singleCoinData, getChartData }
