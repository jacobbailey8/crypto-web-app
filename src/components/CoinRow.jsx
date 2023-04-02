import React, { useState, useEffect } from 'react'
import { singleCoinData } from '../api/coinGeckoAPI';

function CoinRow({ coin }) {

    const [loading, setLoading] = useState(true);
    const [coinData, setCoinData] = useState(undefined);

    const getData = async (id) => {
        const data = await singleCoinData(id);
        setCoinData(data);
    }

    useEffect(() => {
        getData(coin);
    }, [])


    return (
        <div className='' onLoad={() => setLoading(false)}>
            {loading &&
                <div className='flex justify-between '>
                    <div className='bg-overlay animate-pulse rounded-xl w-[70%] h-20'></div>
                    <div className='bg-overlay animate-pulse rounded-xl w-[25%] h-20'></div>
                </div>}

            {
                coinData ?
                    (
                        <div className='flex items-center rounded-lg  text-xl p-3 text-white hover:bg-overlay cursor-pointer'>
                            <div className='w-[50%] flex items-center sm:w-[25%]'>
                                <img className='rounded-full' src={coinData.image.small || ''} alt="coinImage" />
                                <p className='transfrom translate-x-2'>{coinData.name}</p>
                            </div>
                            <div className='hidden sm:block sm:w-[25%] text-center'>{coinData.market_data.current_price.usd.toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'USD'
                            }) || 'n/a'}</div>
                            <div className={'w-[50%] sm:w-[25%] text-center ' + (coinData.market_data.price_change_percentage_24h >= 0 ? 'text-green-300' : 'text-red-300')}>{coinData.market_data.price_change_percentage_24h.toFixed(3) || 'n/a'}{coinData.market_data.price_change_percentage_24h ? '%' : undefined}</div>
                            <div className='hidden sm:block sm:w-[25%] text-center '>{coinData.market_data.market_cap.usd.toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'USD'
                            }) || 'n/a'}</div>
                        </div>
                    )
                    : undefined
            }

        </div>

    )
}

export default CoinRow