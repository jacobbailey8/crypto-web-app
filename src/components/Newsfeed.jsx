import React, { useState, useEffect, useContext } from 'react'
import { generateNews } from '../api/newsDataAPI'
import WatchlistContext from '../WatchlistContext';
import { auth } from '../firebase';
function Newsfeed() {
    const [news, setNews] = useState(undefined);
    const [coins, setCoins] = useState(['bitcoin', 'ethereum']);
    const [inputValue, setInputValue] = useState('');

    const { loggedIn } = useContext(WatchlistContext)


    const getData = async (list) => {
        try {
            let data = await generateNews(list);
            setNews(data);
        }
        catch (err) {
            console.log(err);
        }
    }

    // useEffect(() => {
    //     getData(coins);
    // }, [])

    const handleChange = (event) => {
        setInputValue(event.target.value);

    }
    const handleSubmitSearch = (event) => {
        getData([inputValue]);
        event.preventDefault();
    }

    return (

        loggedIn &&
        <div id='newsfeed' className='relative mt-20'>
            <div className="flex gap-4 items-center">
                <h1 className='text-3xl font-bold text-white mt-10 ml-4'>Newsfeed</h1>
                <form onSubmit={handleSubmitSearch} className='mt-10 mr-2 '>
                    <input onChange={handleChange} value={inputValue} type="text" name="" id="" placeholder='Crypto Name:' className='bg-overlay py-2 px-4 rounded-full text-white w-full' />
                </form>
            </div>
            {news ?
                (
                    news.map((item) => (
                        <div key={item.title} className='p-6'>
                            <a href={item.link}><h2 className='text-white text-xl font-bold cursor-pointer'>{item.title}</h2></a>
                            <p className="text-gray-300 text-md">{item.pubDate}</p>
                            <div className='cursor-pointer w-full h-full rounded-xl'>
                                <a href={item.link}>
                                    {item.image_url ? <div className='w-full max-w-xl mt-2'><img className=' w-full h-full object-cover rounded-xl' src={item.image_url} alt="news image" /></div> : <hr className='' />}
                                </a>

                            </div>
                        </div>
                    ))
                )
                : <div className='text-lg text-white text-center my-12'>Could not load news articles...</div>
            }

        </div>
    )
}

export default Newsfeed