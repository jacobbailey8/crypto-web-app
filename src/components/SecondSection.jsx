import React, { useState, useEffect } from 'react'
import CoinRow from './CoinRow';
import { useContext } from 'react';
import WatchlistContext from '../WatchlistContext';
import { auth } from '../firebase';



function SecondSection() {

    const { watchlist } = useContext(WatchlistContext);
    const { loggedIn } = useContext(WatchlistContext);


    const spinLoader = () => {
        document.querySelector('#spin').classList.add('animate-spin');
        setTimeout(() => {
            document.querySelector('#spin').classList.remove('animate-spin');
        }, 1000);

    }

    return (
        loggedIn &&
        <div id='watchlist' className='w-screen mt-20 relative'>
            <div className='m-3 flex justify-between items-center'>
                <h1 className='text-3xl font-bold text-white'>Market Updates</h1>
                <svg id='spin' onClick={spinLoader} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white m-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
            </div>

            <div className='px-4 w-full text-white mt-6 rounded-t-lg relative flex flex-col gap-4 max-h-[600px] overflow-scroll'>
                <div className='head flex justify-around sm:justify-between  text-xl rounded-t-lg p-3 bg-purple '>
                    <div className='w-[50%] sm:w-[25%]'>Coin</div>
                    <div className='hidden sm:block sm:w-[25%] text-center'>Price</div>
                    <div className='w-[50%] sm:w-[25%] text-center'>Last 24h</div>
                    <div className='hidden sm:block sm:w-[25%] text-center'>Market Cap</div>
                </div>

                {
                    watchlist.length > 0 ?
                        watchlist.map((coin) => (
                            <CoinRow key={coin} coin={coin} />
                        ))
                        :
                        <p className='text-center text-xl'>No Coins Yet...</p>
                }

            </div>




        </div>
    )
}

export default SecondSection