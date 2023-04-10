import { createContext, useState, useEffect } from "react";
import { getDoc, collection, addDoc, deleteDoc, doc, updateDoc, setDoc } from 'firebase/firestore'
import { db } from "../firebase";
import { auth } from "../firebase";
import { onAuthStateChanged } from 'firebase/auth'


const WatchlistContext = createContext();

export function WatchlistProvider({ children }) {

    // user state
    const [watchlist, setWatchList] = useState([]);
    const [currentCoin, setCurrentCoin] = useState(undefined);

    // global app log in status
    const [loggedIn, setLoggedIn] = useState(undefined);

    useEffect(() => {
        onAuthStateChanged(auth, async function (user) {
            if (user) {
                setLoggedIn(true);
                const docref = doc(db, 'users', auth.currentUser.uid);
                const docSnap = await getDoc(docref);
                if (docSnap.exists()) {
                    setWatchList(docSnap.data().coinList);
                }
            } else {
                setLoggedIn(false);
                return;
            }
        });


    }, [])





    const updateList = async (list) => {
        await setDoc(doc(db, 'users', auth.currentUser.uid), {
            coinList: list
        })
    }

    const setList = (list) => {
        setWatchList(list);
    }


    const addToList = async (value) => {
        try {
            let temp = watchlist.concat(value);
            await updateList(temp);
            setWatchList((prev) => [...prev, value]);

        }
        catch (err) {
            console.error(err);
        }
    }

    const removeFromList = async (value) => {
        const index = watchlist.indexOf(value);
        let temp = watchlist.slice(0, index).concat(watchlist.slice(index + 1));
        await updateList(temp);
        if (index > -1) {
            setWatchList(watchlist.slice(0, index).concat(watchlist.slice(index + 1)));
        }
    }

    const resetList = () => {
        setWatchList([]);
    }
    const changeCurrentCoin = (id) => {
        setCurrentCoin(id);
    }
    const changeLoggedIn = (val) => {
        setLoggedIn(val);
    }

    return (
        <WatchlistContext.Provider value={{ watchlist, currentCoin, loggedIn, addToList, removeFromList, changeCurrentCoin, changeLoggedIn, resetList, updateList, setList }}>{children}</WatchlistContext.Provider>
    )
}

export default WatchlistContext;