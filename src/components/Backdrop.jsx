import React from 'react'
import Auth from './Auth'
import LoginContext from '../context/LoginContext'
import { useContext } from 'react'
import { AnimatePresence } from 'framer-motion'

function Backdrop() {

    const { loginOpen } = useContext(LoginContext);
    const { closeLogin } = useContext(LoginContext);


    return (
        <div onClick={closeLogin} className={'absolute w-screen h-screen bg-overlay z-10  items-center justify-center flex ' + (loginOpen ? ' flex' : ' hidden')}>
            <AnimatePresence
                initial={true}
                mode='wait'
            >

                {loginOpen && <Auth key={'modal'} />}
            </AnimatePresence>
        </div>
    )
}

export default Backdrop