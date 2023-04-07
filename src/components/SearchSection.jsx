import React, { useState, useEffect } from 'react'
import { singleCoinData, getChartData } from '../api/coinGeckoAPI';
import CoinInfo from './CoinInfo';
import '../index.css'
import { motion } from 'framer-motion';

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
import WatchlistContext from '../context/WatchlistContext';
import '../index.css'
import { auth } from '../firebase';



function SearchSection({ coins }) {



  const { currentCoin } = useContext(WatchlistContext);
  const { changeCurrentCoin } = useContext(WatchlistContext);
  const [inputValue, setInputValue] = useState('');

  const { loggedIn } = useContext(WatchlistContext);





  const handleChange = (event) => {
    setInputValue(event.target.value);
  };





  const onSearch = (item) => {
    setInputValue(item.name);
    // change coin state
    changeCurrentCoin(item.id);
    // call function to show popup
    const coinInfo = document.querySelector('.CoinInfo');
    coinInfo.classList.remove('-z-20');
    coinInfo.classList.add('z-20');
    coinInfo.classList.remove('-translate-y-56');
    coinInfo.classList.remove('opacity-0');
    coinInfo.classList.add('opacity-100');

  };

  const handleSubmit = (event) => {
    event.preventDefault();
  }


  // animation work for dropdown
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const open = {
    height: '15rem',

  }

  const closed = {
    height: 0,

  }

  return (
    loggedIn &&
    <div onClick={() => setDropdownOpen(false)} id='search-coins' className='w-screen  relative '>
      <div className='col-span-1 flex items-center  flex-col'>
        <h1 className='text-white text-3xl m-4 font-bold'>Search Coins</h1>


        <div className='bg-white flex items-center h-12 ml-4 p-2 w-72 sm:w-96 rounded-t-lg justify-between'>

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>

          <input onClick={(e) => { setDropdownOpen(true); e.stopPropagation() }} onChange={handleChange} value={inputValue} type="text" placeholder='Search for Coins' className=' bg-transparent text-black py-4 px-2  h-full rounded-lg w-[90%] focus:outline-none' />

          <svg onClick={() => setDropdownOpen(false)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 cursor-pointer">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>

        </div>

        {/* new dropdown */}
        <motion.div onClick={e => e.stopPropagation()} animate={dropdownOpen ? open : closed} className=' bg-gradient-to-tr from-purple to-blue-950 from-5% w-72 sm:w-96 ml-4 rounded-b-lg text-white overflow-auto'>

          {
            inputValue.length == 0 &&
            <div className='text-center mt-12'>Start Typing to Search...</div>
          }

          {
            (inputValue.length != 0 && coins
              .filter((item) => {
                const searchTerm = inputValue.toLowerCase();
                const fullName = item.name.toLowerCase();

                return (
                  searchTerm &&
                  fullName.startsWith(searchTerm)
                );
              }).length == 0) &&
            <div className='text-center mt-12'>No Results Found</div>
          }


          {coins
            .filter((item) => {
              const searchTerm = inputValue.toLowerCase();
              const fullName = item.name.toLowerCase();

              return (
                searchTerm &&
                fullName.startsWith(searchTerm)
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


        </motion.div>




        {/* <div className='dropdown text-white bg-overlay  mt-2 rounded-xl  max-h-72 overflow-auto '>
          {coins
            .filter((item) => {
              const searchTerm = inputValue.toLowerCase();
              const fullName = item.name.toLowerCase();

              return (
                searchTerm &&
                fullName.startsWith(searchTerm)
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
        </div> */}
      </div>
      <CoinInfo coinID={currentCoin} />
    </div>
  )
}

export default SearchSection