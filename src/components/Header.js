import React, { useState, useEffect } from 'react'

function Header() {

    const [headerBG, setHeaderBG] = useState('rgba(0,0,0,0.3');

    const handleScroll = () => {
        let scroll = window.scrollY;
        scroll > 50 ? setHeaderBG('rgba(0,0,0,0.8') : setHeaderBG('rgba(0,0,0,0.3');
    }

    useEffect(() => {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      }
    }, [])
    



  return (
    <div style={{background: headerBG}} className='py-2 px-3 flex justify-between items-center fixed top-0 w-screen z-10 transition-all duration-500 ease-out'>
        <div className='text-white text-xl font-bold'>CryptoCave</div>
        <div className='flex gap-2'>
            <button className='border-2 rounded-md border-purple p-1 w-20 text-white'>Sign Up</button>
            <button className='border-2 rounded-md border-purple p-1 w-20 text-white bg-purple'>Log In</button>
        </div>
    </div>
  )
}

export default Header