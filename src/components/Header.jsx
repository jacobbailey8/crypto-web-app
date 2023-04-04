import { signOut } from 'firebase/auth';
import React, { useState, useEffect, useContext } from 'react'
import { auth, signInWithGoogle } from '../firebase';
import WatchlistContext from '../WatchlistContext';

function Header() {

  const [headerBG, setHeaderBG] = useState('rgba(0,0,0,0.3');
  const [signedIn, setSignedIn] = useState(false);

  const { loggedIn } = useContext(WatchlistContext);

  const handleScroll = () => {
    let scroll = window.scrollY;
    scroll > 50 ? setHeaderBG('rgba(0,0,0') : setHeaderBG('rgba(0,0,0,0.3');
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, [])


  const openSignIn = () => {
    document.querySelector('.Auth').classList.remove('hidden');
    document.querySelector('.Auth').classList.add('flex');

  }

  const logOut = async () => {
    try {
      await signOut(auth, googleProvider);
      setSignedIn(false);
    } catch (err) {
      console.error(err);
    }
  }




  return (
    <div style={{ background: headerBG }} className='py-2 px-3 flex justify-between items-center fixed top-0  w-screen z-10 transition-all duration-500 ease-out'>
      <div className='text-white text-xl font-bold w-20'>CryptoCave</div>
      <div className='hidden md:flex gap-10 lg:gap-16 text-white text-md'>
        <a href="#home"><h1>Home</h1></a>
        <a href="#watchlist"><h1>Watchlist</h1></a>
        <a href="#search-coins"><h1>Search</h1></a>
        <a href="#newsfeed"><h1>News</h1></a>
      </div>
      <div className='flex gap-2'>
        {/* <div className='signOut bg-purple text-white p-1 rounded-lg hidden' onClick={logOut}>SignOut</div> */}

        {
          loggedIn &&
          <div className=' bg-gradient-to-br  from-purple to-blue-600 from-30% text-xl uppercase flex items-center justify-center p-4 w-10 h-10 text-white font-bold rounded-full'>{auth.currentUser.displayName.charAt(0)}</div>
        }

        {
          !loggedIn &&
          <button onClick={openSignIn} className='signIn border-2 rounded-md border-purple p-1 w-20 text-white hover:bg-purple transition-all duration-300 ease-out'>Sign In</button>
        }
      </div>
    </div>
  )
}

export default Header