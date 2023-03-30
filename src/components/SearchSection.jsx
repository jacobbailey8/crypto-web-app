import React, { useState, useEffect } from 'react'
import { singleCoinData } from '../api/api_calls';
import '../index.css'



function SearchSection({coins}) {

    const [inputValue, setInputValue] = useState('');
    const [coinName, setCoinName] = useState('');
    const [coinImg, setCoinImg] = useState('');
    const [coinRank, setCoinRank] = useState(0);
    const [coinLink, setCoinLink] = useState('');
    const [coinPrice, setCoinPrice] = useState('');
    const [coinMarketCap, setCoinMarketCap] = useState('n/a');
    const [coinChange, setCoinChange] = useState('');
    const [coinSymbol, setCoinSymbol] = useState('');
    const [coinDescription, setCoinDescription] = useState('');

    
    const handleChange = (event) => {
        setInputValue(event.target.value);
      };

    const updateCoin = async(id) => {
      let data = await singleCoinData(id);
      console.log(data);
      setCoinImg(data.image.large);
      setCoinName(data.name);
      setCoinRank(data.market_cap_rank);
      setCoinLink(data.links.homepage[0]);
      setCoinPrice(data.market_data.current_price.usd);
      setCoinChange(data.market_data.price_change_percentage_24h);
      setCoinSymbol(data.symbol);
      setCoinMarketCap(data.market_data.market_cap.usd);
      setCoinDescription(data.description.en)
    }

    const onSearch = (item) => {
        setInputValue(item.name);
        // our api to fetch the search result
        updateCoin(item.id);

       
    };
    

  return (
    <div id='search-coins' className='w-screen h-screen relative sm:grid grid-cols-2'>
      <div className=''>
          <h1 className='text-white text-3xl m-4 font-bold'>Search Coins</h1>
          <form className='flex items-center h-12 mb-2  rounded-lg ml-4 w-80'>
              <input onChange={handleChange} value={inputValue} type="text" placeholder='ex: bitcoin' className='bg-overlay text-white py-4 px-2 w-[85%] h-full rounded-l-lg' />
              <button  type='button' className='bg-purple p-2 rounded-md w-[15%] h-full flex items-center justify-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
              </button>
          </form>
          <div className='dropdown text-white bg-overlay w-80  rounded-xl ml-4'>
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
                .slice(0, 5)
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
      <div className='text-white bg-overlay w-80 sm:w-[30rem] ml-4 rounded-lg mt-4 flex flex-col items-center py-4 px-2'>
        <img className='w-24 h-24 rounded-full' src={coinImg} alt="coinImage" />
        <a href={coinLink} target='blank'><div className='text-xl font-bold mt-4 cursor-pointer hover:underline transform hover:scale-110'>{coinName}</div></a>
        <div className='text-lg mt-2'>Rank: {coinRank}</div>
        <hr className='w-[70%] mt-2 ' />
        <div className='self-start ml-12 mt-2'>Price: ${coinPrice}</div>
        <div className='self-start ml-12 mt-2'>Market Cap: {coinMarketCap}</div>
        <div className='self-start flex mt-2 ml-12  '>
          <div className='w-[50%]'>24h Change: {coinChange}%</div>
          <div>Symbol: {coinSymbol}</div>
        </div>
        <div className='text-lg mt-4 self-start ml-12'>Description: </div>
        <div id='scrollbar' dangerouslySetInnerHTML={{__html: coinDescription}} className=' self-start ml-12 w-64 sm:w-96 h-32 overflow-scroll [&_a]:text-purple'>
         
        </div>

      </div>

        
      





    </div>
  )
}

export default SearchSection