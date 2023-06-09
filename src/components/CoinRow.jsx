import React, { useState, useEffect } from 'react'
import { singleCoinData } from '../api/coinGeckoAPI';
import { useContext } from 'react';
import WatchlistContext from '../context/WatchlistContext';


function CoinRow({ coin }) {

    const { changeCurrentCoin } = useContext(WatchlistContext);

    const [loading, setLoading] = useState(true);
    const [coinData, setCoinData] = useState(undefined);

    const getData = async (id) => {
        const data = await singleCoinData(id);
        setCoinData(data);
    }

    useEffect(() => {
        getData(coin);
    }, [])

    const showCoinInfo = () => {
        changeCurrentCoin(coin);
        const coinInfo = document.querySelector('.CoinInfo');
        coinInfo.classList.remove('-z-20');
        coinInfo.classList.add('z-20');
        coinInfo.classList.remove('-translate-y-56');
        coinInfo.classList.remove('opacity-0');
        coinInfo.classList.add('opacity-100');
    }
    return (
        <div className='' onLoad={() => setLoading(false)}>
            {loading &&
                <div className='flex justify-between mt-6'>
                    <div className=' bg-zinc-800 animate-pulse rounded-xl w-[70%] h-20'></div>
                    <div className='bg-zinc-800 animate-pulse rounded-xl w-[25%] h-20'></div>
                </div>}

            {
                coinData ?
                    (
                        <div className='flex items-center rounded-lg  text-xl px-3 py-8 text-white hover:bg-overlay cursor-pointer relative'>
                            <div onClick={showCoinInfo} className='w-[100%] h-full absolute top-0 bg-transparent'></div>
                            <div className='w-[50%] flex items-center sm:w-[25%]'>
                                <img className='rounded-full' src={coinData.image?.small || ''} alt="coinImage" />
                                <p className='transfrom translate-x-2'>{coinData?.name}</p>
                            </div>
                            <div className='hidden sm:block sm:w-[25%] text-center'>{coinData?.market_data?.current_price?.usd?.toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'USD'
                            }) || 'n/a'}</div>
                            <div className={'w-[50%] sm:w-[25%] text-center ' + (coinData?.market_data?.price_change_percentage_24h >= 0 ? 'text-green-300' : 'text-red-300')}>{coinData.market_data?.price_change_percentage_24h?.toFixed(3) || 'n/a'}{coinData.market_data?.price_change_percentage_24h ? '%' : undefined}</div>
                            <div className='hidden sm:block sm:w-[25%] sm:max-w-[16rem] overflow-auto text-center '>{coinData?.market_data?.market_cap?.usd?.toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'USD'
                            }) || 'n/a'}</div>
                            {/* <div className='w-[5%]' >
                                <svg className='w-6 text-white' fill="none" viewBox="0 0 15 15" height="1em" width="1em" >
                                    <path
                                        stroke="currentColor"
                                        d="M3 5.5a.5.5 0 11-1 0 .5.5 0 011 0zM8 5.5a.5.5 0 11-1 0 .5.5 0 011 0zM13 5.5a.5.5 0 11-1 0 .5.5 0 011 0zM3 9.5a.5.5 0 11-1 0 .5.5 0 011 0zM8 9.5a.5.5 0 11-1 0 .5.5 0 011 0zM13 9.5a.5.5 0 11-1 0 .5.5 0 011 0z"
                                    />
                                </svg>
                            </div> */}

                        </div>
                    )
                    : undefined
            }


        </div>

    )
}

export default CoinRow