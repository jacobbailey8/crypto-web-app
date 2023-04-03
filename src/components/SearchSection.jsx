import React, { useState, useEffect } from 'react'
import { singleCoinData, getChartData } from '../api/coinGeckoAPI';
import CoinInfo from './CoinInfo';
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
import { auth } from '../firebase';



function SearchSection({ coins }) {



  const { currentCoin } = useContext(WatchlistContext);
  const { changeCurrentCoin } = useContext(WatchlistContext);
  const [inputValue, setInputValue] = useState('');

  const { loggedIn } = useContext(WatchlistContext);


  // // chart section
  // ChartJS.register(
  //   CategoryScale,
  //   LinearScale,
  //   PointElement,
  //   LineElement,
  //   Title,
  //   Tooltip,
  //   Legend
  // );
  // const options = {
  //   responsive: false,
  //   plugins: {
  //     legend: {
  //       position: 'top',
  //     },
  //     title: {
  //       display: false,
  //       text: 'Chart.js Line Chart',
  //     },
  //   },
  // };

  // const labels = ['January', 'February', 'March', 'April'];

  // const data = {
  //   labels,
  //   datasets: [
  //     {
  //       label: 'Cost per Share',
  //       data: [1, 2, 3, 4],
  //       borderColor: 'rgb(49, 0, 97)',
  //       backgroundColor: 'rgb(115, 6, 125)',
  //     },
  //   ],
  // };


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



  return (
    loggedIn &&
    <div id='search-coins' className='w-screen  relative '>
      <div className='col-span-1 flex items-center  flex-col'>
        <h1 className='text-white text-3xl m-4 font-bold'>Search Coins</h1>
        <form onSubmit={handleSubmit} className='flex items-center h-12 mb-2  rounded-lg ml-4 '>
          <input onChange={handleChange} value={inputValue} type="text" placeholder='ex: bitcoin' className='bg-overlay text-white py-4 px-4  h-full rounded-lg' />

        </form>
        <div className='dropdown text-white bg-overlay  mt-2 rounded-xl  max-h-72 overflow-auto '>
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
        </div>
      </div>
      <CoinInfo coinID={currentCoin} />
    </div>
  )
}

export default SearchSection