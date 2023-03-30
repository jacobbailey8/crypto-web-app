import React, { useState, useEffect } from 'react'
import { getAllCoins } from '../api/api_calls';



function SearchSection() {

    const [inputValue, setInputValue] = useState('');
    const [coins, setCoins] = useState([]);

    useEffect(() => {
      const getData = async () => {
        try {
            let data = await getAllCoins();
            setCoins(data);
            return 0;
        }
        catch (err) {
            console.log(err);
            return 1;
        }
        
      }
      let loop = getData();
      while (loop == 1){
        loop = getData();
      }
    })
    
  

    const handleChange = (event) => {
        setInputValue(event.target.value);
      };


      const onSearch = (searchTerm) => {
        setInputValue(searchTerm);
        // our api to fetch the search result
        console.log("search ", searchTerm);
        setInputValue('');
      };
    

  return (
    <div id='search-coins' className='w-screen h-screen relative flex flex-col'>
        <h1 className='text-white text-3xl m-4 font-bold'>Search Coins</h1>
        <form className='flex items-center h-12 mb-4 bg-overlay rounded-lg ml-4 w-80 sm:self-center'>
            <input onChange={handleChange} value={inputValue} type="text" placeholder='ex: bitcoin' className='bg-overlay text-white py-4 px-2 h-full focus:outline-none w-[85%] h-full rounded-l-lg' />
            <button  type='button' className='bg-purple p-2 rounded-md w-[15%] h-full flex items-center justify-center'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
            </button>
        </form>

        <div className='dropdown text-white bg-overlay w-[80%] max-w-[700px] rounded-xl self-center '>
        {coins
            .filter((item) => {
              const searchTerm = inputValue.toLowerCase();
              const fullName = item.name.toLowerCase();

              return (
                searchTerm &&
                fullName.startsWith(searchTerm) &&
                fullName !== searchTerm
              );
            })
            .slice(0, 5)
            .map((item) => (
              <div
                onClick={() => {
                  onSearch(item.name);
    
                }
                }
                className="p-4 "
                key={item.name}
              >
                {item.name}
              </div>
            ))}
        </div>






    </div>
  )
}

export default SearchSection