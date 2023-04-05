import { signOut } from 'firebase/auth';
import React, { useState, useEffect, useContext } from 'react'
import { auth, signInWithGoogle, googleProvider } from '../firebase';
import WatchlistContext from '../context/WatchlistContext';
import { motion } from 'framer-motion';
import LoginContext from '../context/LoginContext';

function Header() {

  // login
  const { openLogin } = useContext(LoginContext);

  const [headerBG, setHeaderBG] = useState('rgba(0,0,0,0.3');

  const { changeLoggedIn } = useContext(WatchlistContext);
  const { resetList } = useContext(WatchlistContext);
  const { resetUserID } = useContext(WatchlistContext);
  const { updateList } = useContext(WatchlistContext);

  const { loggedIn } = useContext(WatchlistContext);
  const { watchlist } = useContext(WatchlistContext);


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

  const logOut = async () => {
    try {
      await updateList(watchlist);
      await resetList();
      await signOut(auth, googleProvider);
      await changeLoggedIn(false);

    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div style={{ background: headerBG }} className='py-2 px-3 flex justify-between items-center fixed top-0  w-screen z-10 transition-all duration-500 ease-out'>
      <div className='text-white text-xl font-bold w-20'>CryptoCave</div>
      <div className='hidden md:flex gap-10 lg:gap-16 text-white text-md'>
        <a href="#home"><h1 className='hover:underline'>Home</h1></a>
        <a href="#watchlist"><h1 className='hover:underline'>Watchlist</h1></a>
        <a href="#search-coins"><h1 className='hover:underline'>Search</h1></a>
        <a href="#newsfeed"><h1 className='hover:underline'>News</h1></a>
      </div>
      <div className='flex gap-2'>

        {
          loggedIn &&
          <motion.button whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }} className=' border-2 rounded-md border-purple py-1 px-2  text-white hover:bg-purple transition-all duration-300 ease-out cursor-pointer' onClick={logOut}>SignOut</motion.button>

        }
        {
          loggedIn &&
          <motion.button whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }} className=' bg-gradient-to-br  from-purple to-blue-600 from-30% text-xl uppercase flex items-center justify-center p-4 w-10 h-10 text-white font-bold rounded-full'>{auth.currentUser?.displayName?.charAt(0)}</motion.button>
        }

        {
          !loggedIn &&
          <motion.button onClick={openLogin} className='signIn border-2 rounded-md border-purple p-1 w-20 text-white hover:bg-purple transition-all duration-300 ease-out'>Sign In</motion.button>
        }
      </div>
    </div>
  )
}

export default Header