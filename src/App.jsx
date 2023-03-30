import React from 'react';
import Header from './components/Header';
import SecondSection from './components/SecondSection';
import Welcome from './components/Welcome';
import SearchSection from './components/SearchSection';
import './index.css';

function App() {
  return (
    <div className="App font-space">
      <div className="bg-black w-screen h-screen fixed inset-0 background" />
      <Header />
      <Welcome />
      <SecondSection />
      <SearchSection />

    </div>
  );
}

export default App;
