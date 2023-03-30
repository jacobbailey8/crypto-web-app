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
    <div className='flex p-3 w-full items-center'>
        <div className='w-[70%] flex gap-4 items-center'>
            <img className='rounded-full' src={coin.item.small} alt="coin" />
            <div className='uppercase'>{coin.item.id}</div>
        </div>
        <div style={{color: priceColor}} className=' flex justify-center w-[30%]'>${priceUpdate}</div>
   
    </div>
  )
}

export default CoinRow