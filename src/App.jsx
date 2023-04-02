import React, { useState, useEffect } from 'react';
import { getAllCoins } from './api/coinGeckoAPI';
import Header from './components/Header';
import SecondSection from './components/SecondSection';
import Welcome from './components/Welcome';
import SearchSection from './components/SearchSection';
import coinList from '../src/data/coinList'
import Newsfeed from './components/Newsfeed';
import './index.css';

function App() {
  const allCoins = coinList;

  return (
    <div className="App font-space">
      <div className="bg-black w-screen h-screen fixed inset-0 background" />
      <Header />
      <Welcome />
      <SecondSection />
      <SearchSection coins={allCoins} />
      <Newsfeed />

    </div>
  );
}

export default App;
