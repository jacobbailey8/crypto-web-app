import React, { useState, useEffect, useContext } from 'react'
import WatchlistContext from '../context/WatchlistContext'
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { motion } from 'framer-motion';



const open = {

    width: '8rem',
    opacity: 100,
}

const closed = {
    width: '2.5rem',
    opacity: 0,
}

function LogoutTab({ isOpen, closeSidebar }) {

    const { resetList } = useContext(WatchlistContext);
    const { updateList } = useContext(WatchlistContext);
    const { watchlist } = useContext(WatchlistContext);
    const { loggedIn } = useContext(WatchlistContext);


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
        <motion.div onClick={logOut} animate={sidebarOpen ? open : closed} transition={{ type: 'spring', bounce: 0.25 }} className='bg-white text-black h-10 invisible sm:visible hidden sm:flex rounded-full items-center justify-center px-2 cursor-pointer'>
            {
                (sidebarOpen) &&
                (
                    <motion.div className='flex items-center justify-center' initial={{ opacity: 0, y: '100px' }} animate={{ opacity: 100, y: '0px' }} transition={{ duration: 0.3 }} >
                        <div>Sign Out</div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                        </svg>
                    </motion.div>


                )

            }
        </motion.div>
    )
}

export default LogoutTab