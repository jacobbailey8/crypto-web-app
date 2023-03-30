import React from 'react'

function Welcome() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
        <h1 className='uppercase text-white text-6xl text-center px-1 font-bold transform -translate-y-12'>Find and Track</h1>
        <h1 className='uppercase text-6xl font-bold transform -translate-y-12 bg-gradient-to-r from-purple  to-blue-400 text-transparent bg-clip-text'> Crypto</h1>
        <h1 className='uppercase text-6xl font-bold transform -translate-y-12 bg-gradient-to-r from-purple  to-blue-400 text-transparent bg-clip-text'> Currencies</h1>
        <button className='p-5 font-bold rounded-full  text-white text-xl transform -translate-y-4 bg-purple'>Search Now</button>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white animate-bounce w-10 h-10 transform translate-y-12">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
        </svg>

    </div>
  )
}

export default Welcome;