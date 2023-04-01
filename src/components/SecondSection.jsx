import React, { useState, useEffect } from 'react'
import { trending, watchlistDataChange } from '../api/api_calls';


function SecondSection() {

   
    

    const spinLoader = () => {
        document.querySelector('#spin').classList.add('animate-spin');
        setTimeout(() => {
            document.querySelector('#spin').classList.remove('animate-spin');
        }, 1000);
      
    }
    
  return (
    <div className='w-screen h-screen relative'>
        <div className='m-3 flex justify-between items-center'>
            <h1 className='text-3xl font-bold text-white'>Market Updates</h1>
            <svg id='spin' onClick={spinLoader} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
        </div>

        <div className='table px-2 w-full text-white mt-6 rounded-t-lg relative'>
            <div className='head flex text-xl rounded-t-lg p-3 bg-purple mb-4 '>
                <div className='w-[70%] flex pl-2'>Coin</div>
                <div className='flex justify-center w-[30%]'>Last 24h</div>
            </div>

           
            
                
            
       
        </div>


    </div>
  )
}

export default SecondSection