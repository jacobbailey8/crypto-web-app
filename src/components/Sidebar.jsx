import React, { useEffect, useState, useContext } from 'react'
import { motion } from 'framer-motion'
import SidebarLink from './SidebarLink'
import WatchlistContext from '../context/WatchlistContext'
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const open = {
    width: '80vw',
    height: '100vh',
    opacity: 100,
}
const closed = {
    width: '2.5rem',
    height: '2.5rem',
    opacity: 0,
}


function Sidebar({ isOpen, closeSidebar }) {


    const { resetList } = useContext(WatchlistContext);
    const { updateList } = useContext(WatchlistContext);
    const { watchlist } = useContext(WatchlistContext);

    const [sidebarOpen, setSidebarOpen] = useState(isOpen);



    useEffect(() => {
        setSidebarOpen(isOpen);
    }, [isOpen]);

    const logOut = async () => {
        try {
            await updateList(watchlist);
            await resetList();
            closeSidebar();
            await signOut(auth);

        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div onClick={() => setSidebarOpen(!sidebarOpen)} className='sm:hidden'>
            <div className={'bg-overlay fixed top-0 left-0 w-screen h-screen ' + (sidebarOpen ? ' block' : ' hidden')}>
            </div>
            <motion.div animate={sidebarOpen ? open : closed} transition={{ duration: 0.3, type: 'spring', bounce: 0.3 }} className=' z-10 fixed rounded-l-lg bg-white top-0 right-0 sm:hidden '>

                {
                    sidebarOpen &&
                    (

                        <>
                            <div className='w-full  mt-24 text-center flex flex-col gap-8'>
                                <SidebarLink name={'Home'} link={'#home'} />
                                <SidebarLink name={'Watchlist'} link={'#watchlist'} />
                                <SidebarLink name={'Search'} link={'#search-coins'} />
                                <SidebarLink name={'News'} link={'#newsfeed'} />
                            </div>
                            <div onClick={logOut} className='mt-16 text-xl text-black flex items-center justify-center gap-2'>
                                <p>Sign Out</p>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                                </svg>

                            </div>
                        </>

                    )
                }

            </motion.div>
        </div>

    )
}

export default Sidebar