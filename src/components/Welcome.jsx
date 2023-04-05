import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { singleCoinData } from '../api/coinGeckoAPI';
import { motion } from "framer-motion"
import WatchlistContext from '../context/WatchlistContext';
import LoginContext from '../context/LoginContext';



function Welcome() {

  // login
  const { openLogin } = useContext(LoginContext);

  const [loadingBit, setLoadingBit] = useState(true);
  const [bitcoin, setBitcoin] = useState(undefined);
  const [loadingEth, setLoadingEth] = useState(true);
  const [eth, setEth] = useState(undefined);
  const [loadingSol, setLoadingSol] = useState(true);
  const [sol, setSol] = useState(undefined);
  const [loadingDoge, setLoadingDoge] = useState(true);
  const [doge, setDoge] = useState(undefined);

  const { loggedIn } = useContext(WatchlistContext);



  const getData = async () => {
    try {
      let data = await singleCoinData('bitcoin');
      setBitcoin(data);
      data = await singleCoinData('ethereum');
      setEth(data);
      data = await singleCoinData('solana');
      setSol(data);
      data = await singleCoinData('dogecoin');
      setDoge(data);
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getData();
  }, [])



  return (

    <div id='home' className="w-screen h-screen flex flex-col items-center justify-center relative">
      <h1 className='uppercase text-white text-6xl text-center px-1 font-bold transform -translate-y-4 sm:-translate-y-8 '>Find and Track</h1>
      <h1 className='uppercase text-6xl font-bold transform -translate-y-4 sm:-translate-y-8 bg-gradient-to-r from-purple  to-blue-400 text-transparent bg-clip-text'> Crypto</h1>
      <h1 className='uppercase text-6xl font-bold transform -translate-y-4 sm:-translate-y-8 bg-gradient-to-r from-purple  to-blue-400 text-transparent bg-clip-text'> Currencies</h1>

      {
        !loggedIn &&
        <motion.button whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }} onClick={openLogin} className='p-5 font-bold rounded-lg  text-white text-xl w-32 border-2 border-purple bg-transparent hover:bg-purple  transition-all duration-300 ease-out'>Log In</motion.button>
      }

      {
        loggedIn &&
        <a href="#search-coins">
          <motion.button className='py-5 w-40 font-bold rounded-full  text-white text-xl transform -translate-y-2 bg-purple'
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          > Search Now </motion.button>
          {/* <button className='py-5 w-40 font-bold rounded-full  text-white text-xl transform -translate-y-2 bg-purple'>Search Now</button> */}
        </a>
      }
      {
        loggedIn &&
        <div className=" transform translate-y-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white animate-bounce w-10 h-10 transform ">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      }
      <div className="flex justify-center gap-8 sm:gap-32 w-full transform translate-y-16">
        <div className={'text-white ' + (loadingBit ? '' : '')} onLoad={() => setLoadingBit(false)}>
          {loadingBit && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-14 h-14 animate-spin">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>}
          {
            bitcoin ?
              (
                <motion.div
                  drag
                  dragConstraints={{
                    top: -50,
                    left: -50,
                    right: 50,
                    bottom: 50,
                  }}
                >
                  <img className='w-20 h-20 sm:w-32 sm:h-32' src={bitcoin.image.small} alt="" />
                  <p className='text-white font-bold text-center text-lg mt-1'>{bitcoin.name}</p>
                  <p className={'mt-1 text-center font-bold sm:text-xl ' + (bitcoin.market_data.price_change_percentage_24h >= 0 ? 'text-green-300' : 'text-red-400')}>{bitcoin.market_data.price_change_percentage_24h.toFixed(2)}%</p>
                </motion.div>


              )
              : undefined
          }

        </div>
        <div className='text-white' onLoad={() => setLoadingEth(false)}>
          {loadingEth && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-14 h-14 animate-spin">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>}
          {
            eth ?
              (

                <motion.div drag
                  dragConstraints={{
                    top: -50,
                    left: -50,
                    right: 50,
                    bottom: 50,
                  }}
                >
                  <img className='w-20 h-20 sm:w-32 sm:h-32' src={eth.image.small} alt="" />
                  <p className='text-white font-bold text-center text-lg mt-1'>{eth.name}</p>
                  <p className={'mt-2 text-center font-bold sm:text-xl ' + (eth.market_data.price_change_percentage_24h >= 0 ? 'text-green-300' : 'text-red-400')}>{eth.market_data.price_change_percentage_24h.toFixed(2)}%</p>
                </motion.div>

              )
              : undefined
          }


        </div>
        <div className='text-white  sm:block' onLoad={() => setLoadingSol(false)}>
          {loadingSol && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-14 h-14 animate-spin">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>}
          {
            sol ?
              (
                <motion.div drag
                  dragConstraints={{
                    top: -50,
                    left: -50,
                    right: 50,
                    bottom: 50,
                  }}
                >
                  <img className='w-20 h-20 sm:w-32 sm:h-32 rounded-full' src={sol.image.small} alt="" />
                  <p className='text-white font-bold text-center text-lg mt-1'>{sol.name}</p>

                  <p className={'mt-2 text-center font-bold sm:text-xl ' + (sol.market_data.price_change_percentage_24h >= 0 ? 'text-green-300' : 'text-red-400')}>{sol.market_data.price_change_percentage_24h.toFixed(2)}%</p>
                </motion.div>

              )
              : undefined
          }


        </div>
        <div className='text-white hidden sm:block' onLoad={() => setLoadingDoge(false)}>
          {loadingDoge && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-14 h-14 animate-spin">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>}
          {
            doge ?
              (
                < motion.div drag
                  dragConstraints={{
                    top: -50,
                    left: -50,
                    right: 50,
                    bottom: 50,
                  }}
                >
                  <img className='w-20 h-20 sm:w-32 sm:h-32' src={doge.image.small} alt="" />
                  <p className='text-white font-bold text-center text-lg mt-1'>{doge.name}</p>
                  <p className={'mt-2 text-center font-bold sm:text-xl ' + (doge.market_data.price_change_percentage_24h >= 0 ? 'text-green-300' : 'text-red-400')}>{doge.market_data.price_change_percentage_24h.toFixed(2)}%</p>
                </motion.div>


              )
              : undefined
          }

        </div>

      </div>
    </div >

  )
}

export default Welcome;