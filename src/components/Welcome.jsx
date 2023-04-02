import React from 'react'
import { useState, useEffect } from 'react';
import { singleCoinData } from '../api/coinGeckoAPI';

function Welcome() {

  const [loadingBit, setLoadingBit] = useState(true);
  const [bitcoin, setBitcoin] = useState(undefined);
  const [loadingEth, setLoadingEth] = useState(true);
  const [eth, setEth] = useState(undefined);

  const getData = async () => {
    let data = await singleCoinData('bitcoin');
    setBitcoin(data);
    data = await singleCoinData('ethereum');
    setEth(data);
  }

  useEffect(() => {
    getData();
  }, [])



  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <h1 className='uppercase text-white text-6xl text-center px-1 font-bold transform -translate-y-12'>Find and Track</h1>
      <h1 className='uppercase text-6xl font-bold transform -translate-y-12 bg-gradient-to-r from-purple  to-blue-400 text-transparent bg-clip-text'> Crypto</h1>
      <h1 className='uppercase text-6xl font-bold transform -translate-y-12 bg-gradient-to-r from-purple  to-blue-400 text-transparent bg-clip-text'> Currencies</h1>
      <button className='p-5 font-bold rounded-full  text-white text-xl transform -translate-y-4 bg-purple'>Search Now</button>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white animate-bounce w-10 h-10 transform translate-y-12">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
      </svg>
      <div className="flex justify-around w-full transform translate-y-16">
        <div className={'text-white ' + (loadingBit ? '' : '')} onLoad={() => setLoadingBit(false)}>
          {loadingBit && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 animate-spin">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>}
          {
            bitcoin ?
              (
                <img src={bitcoin.image.small} alt="" />

              )
              : undefined
          }
          {
            bitcoin ?
              (
                <p className={'mt-2 ' + (bitcoin.market_data.price_change_percentage_24h >= 0 ? 'text-green-300' : 'text-red-400')}>{bitcoin.market_data.price_change_percentage_24h.toFixed(2)}%</p>
              )
              : undefined
          }

        </div>
        <div className='text-white' onLoad={() => setLoadingEth(false)}>
          {loadingEth && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 animate-spin">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>}
          {
            eth ?
              (
                <img src={eth.image.small} alt="" />

              )
              : undefined
          }
          {
            eth ?
              (
                <p className={'mt-2 ' + (eth.market_data.price_change_percentage_24h >= 0 ? 'text-green-300' : 'text-red-400')}>{eth.market_data.price_change_percentage_24h.toFixed(2)}%</p>
              )
              : undefined
          }

        </div>
      </div>
    </div>
  )
}

export default Welcome;