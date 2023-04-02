const API_BASE = 'https://newsdata.io/api/1/news?apikey=pub_1989427536eda4cfe1dc877d969dcc433917f&language=en&qInTitle=';

const generateNews = async (coinNames) => {
    let formattedArray = coinNames.join(' OR ');
    const resp = await fetch(`${API_BASE}${formattedArray}`);
    const data = await resp.json();
    return data.results;
}

export { generateNews };