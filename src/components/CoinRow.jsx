import React, { useState, useEffect } from 'react'

function CoinRow({coin, priceChanges}) {

    const[priceUpdate, setPriceUpdate] = useState(0);
    const[priceColor, setPriceColor] = useState('green');

    useEffect(() => {
        try {
            setPriceUpdate(priceChanges[`${coin.item.id}`].usd_24h_change.toFixed(2));
            priceUpdate >= 0 ? setPriceColor('rgb(74 222 128') : setPriceColor('rgb(248 113 113');


        }
        catch (err){
            setPriceUpdate('Not Available');
            setPriceColor('rgb(248 113 113');
        }
      
    }, [priceChanges, priceUpdate, coin.item.id])
    


  return (
    <div className='flex py-3 pr-2 w-full items-center relative'>

        <div className='w-[70%] flex gap-4 items-center invisible '>
            <img className='rounded-full' src={coin.item.small} alt="coin" />
            <div className='uppercase'>{coin.item.id}</div>
        </div>
        <div style={{color: priceColor}} className='flex justify-center w-[30%] invisible'>${priceUpdate}</div>
   
        <div className='flex gap-6 p-3 w-full items-center absolute z-10'>
            <div className='w-[80%] mr-4 h-12 bg-purple rounded-full animate-pulse '></div>
            <div className='w-[35%] h-12 rounded-full bg-purple animate-pulse '></div>
        </div>
    </div>

  )
}

export default CoinRow