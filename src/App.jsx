import React, { useState, useEffect } from 'react';
import { getAllCoins } from './api/coinGeckoAPI';
import Header from './components/Header';
import SecondSection from './components/SecondSection';
import Welcome from './components/Welcome';
import SearchSection from './components/SearchSection';
import coinList from '../src/data/coinList'
import Newsfeed from './components/Newsfeed';
import './index.css';
import { WatchlistProvider } from './WatchlistContext';


function App() {
  const allCoins = coinList;

  return (
    <WatchlistProvider>
      <div className="App font-space overflow-hidden">
        <div className="bg-black w-screen h-screen fixed inset-0 background" />
        <Header />
        <Welcome />
        <SearchSection coins={allCoins} />
        <SecondSection />
        <Newsfeed />
      </div >
    </WatchlistProvider>


  );
}

export default App;
