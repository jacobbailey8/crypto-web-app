import React, { useState, useEffect } from 'react'
import CoinRow from './CoinRow';
import { useContext } from 'react';
import WatchlistContext from '../context/WatchlistContext';
import { auth } from '../firebase';
import { Reorder } from 'framer-motion';



function SecondSection() {

    // state for reloading
    const [reload, setReload] = useState(false);

    const { watchlist } = useContext(WatchlistContext);
    const { setList } = useContext(WatchlistContext);
    const { loggedIn } = useContext(WatchlistContext);


    const spinLoader = () => {
        document.querySelector('#spin').classList.add('animate-spin');
        setReload(!reload);
        setTimeout(() => {
            document.querySelector('#spin').classList.remove('animate-spin');
        }, 1000);

    }

    return (
        loggedIn &&
        <div id='watchlist' className='w-screen mt-20 relative'>
            <div className='m-3 flex justify-between items-center'>
                <h1 className='text-3xl font-bold text-white px-2'>Market Updates</h1>

            </div>

            <div className='px-4 w-full text-white mt-6 rounded-t-lg relative flex flex-col max-h-[600px] overflow-scroll'>
                <div className='head flex justify-around sm:justify-between  text-xl rounded-t-lg p-3 bg-purple'>
                    <div className='w-[50%] sm:w-[25%]'>Coin</div>
                    <div className='hidden sm:block sm:w-[25%] text-center'>Price</div>
                    <div className='w-[50%] sm:w-[25%] text-center'>Last 24h</div>
                    <div className='hidden sm:block sm:w-[25%] text-center'>Market Cap</div>
                </div>

                {
                    watchlist.length > 0 ?
                        <Reorder.Group axis="y" values={watchlist} onReorder={setList}>
                            {watchlist.map((coin) => (
                                <Reorder.Item key={coin} value={coin}>
                                    <CoinRow key={coin} coin={coin} />
                                </Reorder.Item>
                            ))}
                        </Reorder.Group>
                        : undefined
                }

            </div>




        </div>
    )
}

export default SecondSection