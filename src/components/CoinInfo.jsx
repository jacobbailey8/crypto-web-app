import React, { useState, useEffect } from 'react'
import { useContext } from 'react';
import WatchlistContext from '../context/WatchlistContext';
import { singleCoinData } from '../api/coinGeckoAPI';
import { prices } from '../data/prices';
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


    responsive: true,
    plugins: {
        legend: {
            display: false,
            position: 'top',
        },
        title: {
            display: false,
            text: 'Chart.js Line Chart',
        },

    },

    scales: {
        // to remove the labels
        x: {
            ticks: {
                display: false,
            },

            // to remove the x-axis grid
            // grid: {
            //     drawBorder: false,
            //     display: false,
            // },
        },
        // to remove the y-axis labels
        y: {
            ticks: {
                display: false,
                beginAtZero: true,
            },
            // to remove the y-axis grid
            // grid: {
            //     drawBorder: false,
            //     display: false,
            // },
        },
    },
};


const labels = prices.map((item) => {
    let time = new Date(item[0]);
    return time.toString().slice(4, 15);
});

const data = {
    labels,
    datasets: [
        {
            label: 'PPS (USD)',
            pointStyle: false,
            data: prices.map((item) => item[1]),
            borderColor: 'rgba(115, 6, 125, 1)',
            backgroundColor: 'rgba(115, 6, 125, 1)',
        },

    ],
};

function CoinInfo({ coinID }) {


    const { addToList } = useContext(WatchlistContext);
    const { watchlist } = useContext(WatchlistContext);
    const { removeFromList } = useContext(WatchlistContext);
    const { updateList } = useContext(WatchlistContext);



    const [coinData, setCoinData] = useState(undefined);
    const [loading, setLoading] = useState(true);






    useEffect(() => {
        const getData = async () => {
            try {
                const data = await singleCoinData(coinID);
                setCoinData(data);
            }
            catch (err) {
                console.log(err)
            }

        }
        getData();
        console.log(labels);
        console.log(prices.map((item) => item[1]));

    }, [coinID])

    const handleBackBtn = () => {
        const coinInfo = document.querySelector('.CoinInfo');
        coinInfo.classList.remove('z-20');
        coinInfo.classList.remove('opacity-100');
        coinInfo.classList.add('opacity-0');
        coinInfo.classList.add('-translate-y-56');
        coinInfo.classList.add('-z-20');
    }

    const handleAddCoin = async () => {
        if (watchlist.includes(coinID)) {
            return;
        }
        else {
            addToList(coinID);

            // animate
        }
    }

    const handleDeleteCoin = () => {
        removeFromList(coinID);
    }
    return (
        <div className='CoinInfo fixed top-0 left-0 w-screen h-screen -z-20 opacity-0 -translate-y-56 transition-all duration-300 ease-out'>
            {/* back button */}
            <motion.button whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }} onClick={handleBackBtn} className='absolute top-0 left-0 m-4 bg-purple rounded-xl text-white p-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                </svg>
            </motion.button>
            {/* add button */}
            <div whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }} className='absolute top-0 right-0 m-4 flex gap-4'>
                <motion.button onClick={handleDeleteCoin} className=' bg-purple rounded-xl text-white p-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>

                </motion.button>
                <motion.button whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }} onClick={handleAddCoin} className=' bg-purple rounded-xl text-white p-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </motion.button>
            </div>


            {/* main info */}
            <div className='sm:grid grid-cols-3 grid-rows-2 mt-16 sm:mt-48 overflow-scroll'>
                <div onLoad={() => setLoading(false)} className='col-span-1 flex flex-col items-center sm:h-full'>
                    {loading &&
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-white animate-spin">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                            </svg>

                        </div>
                    }
                    {
                        coinData ?
                            (
                                <div className='w-full h-full flex flex-col items-center justify-center  pb-4'>
                                    {coinData.image ? <img className='w-24 h-24 sm:w-32 sm:h-32 rounded-full' src={coinData.image.small} alt="coinImage" /> : null}
                                    <p className='text-white text-2xl sm:text-4xl font-bold mt-4 text-center'>{coinData.name}</p>
                                    <p className='text-white text-lg sm:text-2xl font-bold mt-2'>Rank: {coinData.market_cap_rank || 'n/a'}</p>
                                </div>
                            )
                            :
                            undefined
                    }


                </div>
                <div onLoad={() => setLoading(false)} className='col-span-2'>
                    {loading &&
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-white animate-spin">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                            </svg>

                        </div>
                    }
                    {
                        coinData ?
                            (
                                <div className='h-full w-full flex flex-col items-center mt-4 sm:mt-0'>
                                    <div className='sm:flex gap-20 sm:pl-6'>
                                        {coinData.market_data.price_change_percentage_24h ? <p className='text-white text-lg'>Last 24h: <span className={coinData.market_data.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'}> {`${coinData.market_data.price_change_percentage_24h.toFixed(3)}%`}</span></p> : <p className='text-white text-lg'>n/a</p>}
                                        {coinData.market_data ? <p className='text-white text-lg'>Current Price: {coinData.market_data.current_price.usd.toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: 'USD'
                                        })}</p> : 'n/a'}
                                        {coinData.market_data ? <p className='text-white text-lg'>Market Cap: {coinData.market_data.market_cap.usd.toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: 'USD'
                                        })}</p> : 'n/a'}
                                    </div>
                                    {/* <div className='self-start p-4'>
                                        <p className='text-xl text-white font-bold'>Description:</p>
                                        {coinData.description ? <div className='max-h-[240px] overflow-scroll description text-white mt-2' dangerouslySetInnerHTML={{ __html: coinData.description.en }} /> : 'No Description Available'}
                                    </div> */}
                                    <div className='h-full w-full'>
                                        <Line style={{ width: '40rem' }} options={options} data={data} />;

                                    </div>
                                </div>
                            )
                            : undefined
                    }
                </div>


            </div>


        </div>
    )
}

export default CoinInfo