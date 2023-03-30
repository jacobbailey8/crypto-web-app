import React, { useState, useEffect } from 'react';
import { getAllCoins } from './api/api_calls';
import Header from './components/Header';
import SecondSection from './components/SecondSection';
import Welcome from './components/Welcome';
import SearchSection from './components/SearchSection';
import './index.css';

function App() {
  const [allCoins, setAllCoins] = useState([]);

  useEffect(() => {
    let getData = async() => {
      let data = await getAllCoins();
      setAllCoins(data);
    }

    getData();
  
    
  })
  
  return (
    <div className="App font-space">
      <div className="bg-black w-screen h-screen fixed inset-0 background" />
      <Header />
      <Welcome />
      <SecondSection />
      <SearchSection coins={allCoins}/>

    </div>
  );
}

export default App;
