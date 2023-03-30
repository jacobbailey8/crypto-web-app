const API_BASE = 'https://api.coingecko.com/api/v3';

const trending = async () => {
    let res = await fetch(`${API_BASE}/search/trending`)
    let data = await res.json();
    return data.coins;

   
}

const watchlistDataChange = async (list) => {
    let formattedArray = list.map((element) => (
        element.item.id
    ));
    let coinString = formattedArray.join('%2C')
    let res = await fetch(`${API_BASE}/simple/price?ids=${coinString}&vs_currencies=usd&include_24hr_change=true`);
    let data = await res.json();
    return data;
}

const getAllCoins = async () => {
    let res = await fetch(`${API_BASE}/coins/list`);
    let data = await res.json();
    return data;
}


export {trending, watchlistDataChange, getAllCoins};