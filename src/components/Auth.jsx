import React, { useState, useEffect, useContext } from 'react'
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithPopup, signOut, signInWithEmailAndPassword, signInWithRedirect, setPersistence, browserLocalPersistence } from 'firebase/auth'
import { googleProvider } from '../firebase';
import WatchlistContext from '../WatchlistContext';
import googleLogo from '../assets/img/google-logo.png'
import facebook from '../assets/img/facebook.png'
import github from '../assets/img/github.png'
import microsoft from '../assets/img/microsoft.png'




function Auth() {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { changeLoggedIn } = useContext(WatchlistContext);
    const { resetList } = useContext(WatchlistContext);
    const { resetUserID } = useContext(WatchlistContext);
    const { updateList } = useContext(WatchlistContext);

    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            await changeLoggedIn(true);
            document.querySelector('.Auth').classList.remove('flex');
            document.querySelector('.Auth').classList.add('hidden');
        } catch (err) {
            console.error(err);
        }
    }
    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            await changeLoggedIn(true);
            document.querySelector('.Auth').classList.remove('flex');
            document.querySelector('.Auth').classList.add('hidden');
        } catch (err) {
            console.error(err);
        }
    }

    const logOut = async () => {
        try {
            await updateList();
            await resetList();
            await signOut(auth, googleProvider);
            await changeLoggedIn(false);

        } catch (err) {
            console.error(err);
        }
    }

    const logIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            changeLoggedIn(true);
        } catch (err) {
            console.error(err);
        }
    }

    const closeSignIn = () => {
        document.querySelector('.Auth').classList.remove('flex');
        document.querySelector('.Auth').classList.add('hidden');

    }
    return (
        <div className='Auth hidden absolute top-0 right-0 m-1 z-20 flex-col p-4 gap-4 rounded-xl bg-black'>
            <div onClick={closeSignIn} className='absolute top-0 right-0 m-3 cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            {
                auth.currentUser != null &&
                (
                    <div className='absolute top-0 left-0 m-3 cursor-pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                        </svg>

                    </div>
                )
            }
            <h1 className='text-white font-bold text-center text-2xl'>Sign Up</h1>
            <input onChange={e => setEmail(e.target.value)} placeholder='Email:' className=' bg-zinc-900 text-white p-2 rounded-lg' type="text" />
            <input onChange={e => setPassword(e.target.value)} type='password' placeholder='Password:' className=' bg-zinc-900 text-white p-2 rounded-lg' type="text" />
            <button onClick={signIn} className='bg-purple text-white p-2 rounded-lg'>Sign Up</button>
            <button onClick={logIn} className='bg-purple text-white p-2 rounded-lg'>Log In</button>
            <button onClick={signInWithGoogle} className=' bg-white p-2 rounded-lg text-[#757575] flex items-center justify-center gap-2'>

                <img className='w-7 h-7' src={googleLogo} alt="" />
                Log In With Google
            </button>
            {/* <button onClick={signInWithGoogle} className=' bg-[#3b5998] p-2 rounded-lg text-white flex items-center justify-center gap-2'>

                <img className='w-7 h-7' src={facebook} alt="" />
                Log In With Facebook
            </button>
            <button onClick={signInWithGoogle} className=' bg-[#171515] p-2 rounded-lg text-white flex items-center justify-center gap-2'>

                <img className='w-7 h-7' src={github} alt="" />
                Log In With Github
            </button>
            <button onClick={signInWithGoogle} className=' bg-white p-2 rounded-lg text-[#757575] flex items-center justify-center gap-2'>

                <img className='w-4 h-4' src={microsoft} alt="" />
                Log In With Microsoft
            </button> */}
            <button onClick={logOut} className='bg-purple text-white p-2 rounded-lg'>Log Out</button>





        </div>
    )
}

export default Auth