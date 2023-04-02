import React, { useState, useEffect } from 'react'
import { singleCoinData, getChartData } from '../api/coinGeckoAPI';
import '../index.css'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useContext } from 'react';
import WatchlistContext from '../WatchlistContext';
import '../index.css'



function SearchSection({ coins }) {



  // input
  const [inputValue, setInputValue] = useState('');

  // coin
  const [coinID, setCoinID] = useState(undefined);
  const [coinName, setCoinName] = useState('');
  const [coinImg, setCoinImg] = useState('');
  const [coinRank, setCoinRank] = useState(0);
  const [coinLink, setCoinLink] = useState('');
  const [coinPrice, setCoinPrice] = useState('n/a');
  const [coinMarketCap, setCoinMarketCap] = useState('n/a');
  const [coinChange, setCoinChange] = useState('');
  const [coinSymbol, setCoinSymbol] = useState('');
  const [coinDescription, setCoinDescription] = useState('');
  const [chartData, setChartData] = useState(undefined);

  // context
  const { watchlist } = useContext(WatchlistContext);
  const { addToList } = useContext(WatchlistContext);

  // info
  const [infoOpacity, setInfoOpacity] = useState('0');


  useEffect(() => {
    updateCoin('bitcoin');
  }, [])

  // chart section
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  const options = {
    responsive: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: 'Chart.js Line Chart',
      },
    },
  };

  const labels = ['January', 'February', 'March', 'April'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Cost per Share',
        data: [1, 2, 3, 4],
        borderColor: 'rgb(49, 0, 97)',
        backgroundColor: 'rgb(115, 6, 125)',
      },
    ],
  };


  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const updateCoin = async (id) => {

    let data = await singleCoinData(id);
    let prices = await getChartData(id);

    setCoinID(data.id);
    setCoinImg(data.image.large);
    setCoinName(data.name);
    setCoinRank(data.market_cap_rank || 'n/a');
    setCoinLink(data.links.homepage[0]);
    setCoinPrice(data.market_data.current_price.usd || 'n/a');
    setCoinChange(data.market_data.price_change_percentage_24h || 'n/a');
    setCoinSymbol(data.symbol);
    setCoinMarketCap(data.market_data.market_cap.usd || 'n/a');
    setCoinDescription(data.description.en || 'No description available')
    setChartData(prices);
  }

  const onSearch = (item) => {
    setInputValue(item.name);
    // our api to fetch the search result
    updateCoin(item.id);
    setInfoOpacity('100');
    document.querySelector('.info').classList.remove('-translate-y-56');
    document.querySelector('.info').classList.add('translate-y-0');
    document.querySelector('.info').classList.remove('-z-20');
    document.querySelector('.info').classList.add('z-20');



  };

  const handleAddCoin = () => {
    // add coin id to global state list of watchlist coins
    if (watchlist.includes(coinID)) {
      console.log(watchlist);

      // do nothing
      return;
    }
    else {
      addToList(coinID);
      console.log(watchlist);
      // add animations
    }

  }

  const handleBackBtn = () => {
    setInfoOpacity('0');
    document.querySelector('.info').classList.add('-translate-y-56');
    document.querySelector('.info').classList.remove('translate-y-0');
    document.querySelector('.info').classList.add('-z-20');
    document.querySelector('.info').classList.remove('z-20');
  }

  return (
    <div id='search-coins' className='w-screen  relative '>
      <div className='col-span-1 flex items-center  flex-col'>
        <h1 className='text-white text-3xl m-4 font-bold'>Search Coins</h1>
        <form className='flex items-center h-12 mb-2  rounded-lg ml-4 '>
          <input onChange={handleChange} value={inputValue} type="text" placeholder='ex: bitcoin' className='bg-overlay text-white py-4 px-4  h-full rounded-lg' />

        </form>
        <div className='dropdown text-white bg-overlay  mt-2 rounded-xl  max-h-72 overflow-auto '>
          {coins
            .filter((item) => {
              const searchTerm = inputValue.toLowerCase();
              const fullName = item.name.toLowerCase();

              return (
                searchTerm &&
                fullName.startsWith(searchTerm) &&
                fullName !== searchTerm
              );
            })

            .map((item) => (
              <div
                onClick={() => {
                  onSearch(item);
                }
                }
                className="p-4 cursor-pointer hover:bg-overlay"
                key={item.name}
              >
                {item.name}
              </div>
            ))}
        </div>
      </div>
      <div style={{ opacity: infoOpacity }} className='info  flex justify-center col-span-2 fixed top-0 left-0 transform -translate-y-56 w-screen h-screen  transition-all duration-300 ease-out -z-20'>
        <div className='text-white  w-full mx-2 sm:m-6 rounded-lg mt-4 sm:mt-2 flex flex-col items-center justify-center py-4 relative'>
          {/* add to list button */}
          <button onClick={handleAddCoin} className='text-white bg-purple px-2 py-2 absolute top-0 right-0  m-2 rounded-xl'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
          {/* back button */}
          <button onClick={handleBackBtn} className='text-white bg-purple px-2 py-2 absolute top-0 left-0  m-2 rounded-xl'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
            </svg>

          </button>

          <img className='w-24 h-24 rounded-full' src={coinImg} alt="coinImage" />
          <a href={coinLink} target='blank'><div className='text-xl font-bold mt-4 cursor-pointer hover:underline transform hover:scale-110'>{coinName}</div></a>
          <div className='text-lg mt-2'>Rank: {coinRank}</div>
          <hr className='w-[70%] mt-2 ' />
          <div className='self-start sm:self-center ml-12 mt-2'>Price:  {coinPrice.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
          })}</div>
          <div className='self-start sm:self-center ml-12 mt-2'>Market Cap:  {coinMarketCap.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
          })}</div>
          <div className='self-start sm:self-center flex mt-2 ml-12  '>
            <div className={(coinChange >= 0 ? `text-green-400` : `text-red-400`) + ' w-[50%]'}><span className='text-white'>24h Change: </span>{coinChange}%</div>
            <div>Symbol: {coinSymbol}</div>
          </div>
          <div className='text-lg mt-4 self-start sm:self-center ml-6 mb-4'>Description: </div>
          <div id='scrollbar' dangerouslySetInnerHTML={{ __html: coinDescription }} className=' self-start sm:self-center ml-6 h-40 sm:h-72 overflow-scroll [&_a]:text-violet-300'>
          </div>
          {/* {
            chartData ?
              <div className='px-2 py-4 mt-4'>
                <Line style={{ width: '100%' }} options={options} data={data} />
              </div>
              : undefined
          } */}

        </div>
      </div>
    </div>
  )
}

export default SearchSection