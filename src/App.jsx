import React, { useState, useEffect, useContext } from 'react';
import { getAllCoins } from './api/coinGeckoAPI';
import Header from './components/Header';
import Auth from './components/Auth';
import SecondSection from './components/SecondSection';
import Welcome from './components/Welcome';
import SearchSection from './components/SearchSection';
import coinList from '../src/data/coinList'
import Newsfeed from './components/Newsfeed';
import './index.css';
import { WatchlistProvider } from '../src/context/WatchlistContext';
import { LoginProvider } from '../src/context/LoginContext';
import Backdrop from './components/Backdrop';





function App() {

  const allCoins = coinList;







  return (
    <WatchlistProvider>
      <LoginProvider>
        <div className="App font-space overflow-hidden">
          <Backdrop />
          <div className="bg-black w-screen h-screen fixed inset-0 background" />
          <Header />
          <Welcome />
          <SearchSection coins={allCoins} />
          <SecondSection />
          <Newsfeed />
        </div >
      </LoginProvider>
    </WatchlistProvider>


  );
}

export default App;
