import React, { useState, useEffect } from 'react'
import { useContext } from 'react';
import WatchlistContext from '../context/WatchlistContext';
import { singleCoinData } from '../api/coinGeckoAPI';
import { motion } from 'framer-motion';
import { getChartData } from '../api/coinGeckoAPI';
import { NinetyRingWithBg, BlocksShuffleThree, BarsScaleMiddle } from "react-svg-spinners";


import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
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

        x: {
            ticks: {
                display: false,
            },
        },

        y: {
            ticks: {
                display: false,
                beginAtZero: true,
            },
        },
    }
}







function CoinInfo({ coinID }) {
    const [completeData, setCompleteData] = useState(undefined);
    const [priceData, setPriceData] = useState(undefined);
    const [labelData, setLabelData] = useState(undefined);





    const changeThreeMonth = () => {
        setPriceData(completeData?.slice((completeData.length / 4) * 3).map((item) => item[1]));
        setLabelData(completeData?.slice((completeData.length / 4) * 3).map((item) => {
            let time = new Date(item[0]);
            return time.toString().slice(4, 15)
        }));
    }
    const changeSixMonth = () => {
        setPriceData(completeData?.slice(completeData.length / 2).map((item) => item[1]));
        setLabelData(completeData?.slice(completeData.length / 2).map((item) => {
            let time = new Date(item[0]);
            return time.toString().slice(4, 15)
        }));
    }

    const changeOneYear = () => {
        setPriceData(completeData?.map((item) => item[1]));
        setLabelData(completeData?.map((item) => {
            let time = new Date(item[0]);
            return time.toString().slice(4, 15)
        }));
    }

    useEffect(() => {
        const getCompletePrices = async () => {
            try {
                // api call
                let data = await getChartData(coinID);
                setCompleteData(data);
            } catch (err) {
                console.error(err);
            }
        }
        if (coinID !== undefined) {
            getCompletePrices();
            changeThreeMonth();
        }

    }, [coinID])

    const data = {
        labels: labelData,
        datasets: [
            {
                pointBackgroundColor: 'rgba(115, 6, 125, 1)',
                label: 'PPS (USD)',
                pointStyle: false,
                data: priceData,
                borderColor: 'rgba(115, 6, 125, 1)',
                backgroundColor: 'rgba(115, 6, 125, 1)',
                fill: {
                    target: "origin", // 3. Set the fill options
                    above: "rgba(184, 12, 199, 0.3)"
                },

            },

        ],
    };

    const { addToList } = useContext(WatchlistContext);
    const { watchlist } = useContext(WatchlistContext);
    const { removeFromList } = useContext(WatchlistContext);
    const { updateList } = useContext(WatchlistContext);



    const [coinData, setCoinData] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const [addCoinLoad, setAddCoinLoad] = useState(false);






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
        if (coinID !== undefined) {
            getData();
        }


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
            setAddCoinLoad(true);
            await addToList(coinID);
            setAddCoinLoad(false);
        }
    }

    const handleDeleteCoin = async () => {
        setAddCoinLoad(true);
        await removeFromList(coinID);
        setAddCoinLoad(false);
    }
    return (
        <div className='CoinInfo overflow-scroll fixed top-0 left-0 w-screen h-screen -z-20 opacity-0 -translate-y-56 transition-all duration-300 ease-out'>
            {/* back button */}
            <motion.button whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }} onClick={handleBackBtn} className='absolute top-0 left-0 m-4 bg-purple rounded-xl text-white p-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                </svg>
            </motion.button>
            {/* add button */}
            <div className='absolute top-0 right-0 m-4 flex gap-4'>


                {
                    (!watchlist.includes(coinID)) &&
                    <motion.button whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }} onClick={handleAddCoin} className=' bg-purple rounded-xl text-white p-2'>

                        {addCoinLoad ?

                            <NinetyRingWithBg color='white' />

                            : (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>)
                        }

                    </motion.button>
                }

                {
                    (watchlist.includes(coinID)) &&
                    <motion.button onClick={handleDeleteCoin} whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }} className=' bg-purple rounded-xl text-white p-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>

                    </motion.button>
                }

            </div>


            {/* main info */}
            <div className='sm:grid grid-cols-3 grid-rows-2 mt-16 sm:mt-48 overflow-scroll'>
                <div onLoad={() => setLoading(false)} className='col-span-1 flex flex-col items-center sm:h-full'>
                    {/* {loading &&
                        <BlocksShuffleThree width={'8rem'} height={'8rem'} color={'white'} />
                    } */}
                    {
                        coinData ?
                            (
                                <div className='w-full h-full flex flex-col items-center justify-center  pb-4'>
                                    {coinData?.image ? <img className='w-24 h-24 sm:w-32 sm:h-32 rounded-full' src={coinData?.image?.small} alt="coinImage" /> : null}
                                    <p className='text-white text-2xl sm:text-4xl font-bold mt-4 text-center'>{coinData?.name}</p>
                                    <p className='text-white text-lg sm:text-2xl font-bold mt-2'>Rank: {coinData?.market_cap_rank || 'n/a'}</p>
                                </div>
                            )
                            :
                            undefined
                    }


                </div>
                <div onLoad={() => setLoading(false)} className='col-span-2'>
                    {loading &&
                        (<>
                            <BarsScaleMiddle color='rgb(132, 0, 152)' width={'12rem'} height={'12rem'} />
                            <div>Could not load data. Please refresh page to try again.</div>
                        </>
                        )
                    }
                    {
                        coinData ?
                            (
                                <div className='h-full w-full flex flex-col items-center mt-4 sm:mt-0'>
                                    <div className='sm:flex gap-20 sm:pl-6'>
                                        {coinData.market_data.price_change_percentage_24h ? <p className='text-white text-lg'>Last 24h: <span className={coinData.market_data.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'}> {`${coinData.market_data.price_change_percentage_24h.toFixed(3)}%`}</span></p> : <p className='text-white text-lg'>n/a</p>}
                                        {coinData.market_data ? <p className='text-white text-lg'>Current Price: {coinData?.market_data?.current_price?.usd?.toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: 'USD'
                                        })}</p> : 'n/a'}
                                        {coinData.market_data ? <p className='text-white text-lg'>Market Cap: {coinData?.market_data?.market_cap?.usd?.toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: 'USD'
                                        })}</p> : 'n/a'}
                                    </div>

                                    <div className='w-full h-full min-w-full flex overflow-x-auto snap-x'>
                                        <div onLoad={changeThreeMonth} className='h-full w-full min-w-full px-4 snap-start'>
                                            <Line style={{}} options={options} data={data} />;
                                            <div className='flex justify-center gap-4'>
                                                <motion.button onClick={changeThreeMonth} whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }} className='text-white p-2 bg-purple rounded-lg w-8 h-8 text-xs sm:w-10 sm:h-10 sm:text-base'>3M</motion.button>
                                                <motion.button onClick={changeSixMonth} whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }} className='text-white p-2 bg-purple rounded-lg w-8 h-8 text-xs sm:w-10 sm:h-10 sm:text-base'>6M</motion.button>
                                                <motion.button onClick={changeOneYear} whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }} className='text-white p-2 bg-purple rounded-lg w-8 h-8 text-xs sm:w-10 sm:h-10 sm:text-base'>1Y</motion.button>

                                            </div>
                                        </div>
                                        <div className='self-start p-4 w-full h-full min-w-full snap-start'>
                                            <p className='text-xl text-white font-bold'>Description:</p>
                                            {coinData.description ? <div className='max-h-[240px] overflow-scroll description text-white mt-2' dangerouslySetInnerHTML={{ __html: coinData.description.en }} /> : 'No Description Available'}
                                        </div>
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