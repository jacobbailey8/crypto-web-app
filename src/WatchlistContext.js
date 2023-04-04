import { createContext, useState, useEffect } from "react";
import { getDoc, collection, addDoc, deleteDoc, doc, updateDoc, setDoc } from 'firebase/firestore'
import { db } from "./firebase";
import { auth } from "./firebase";

const WatchlistContext = createContext();

export function WatchlistProvider({ children }) {

    // user state
    const [watchlist, setWatchList] = useState([]);
    const [currentCoin, setCurrentCoin] = useState('bitcoin');

    // global app log in status
    const [loggedIn, setLoggedIn] = useState();

    // reference to database
    const userCollection = collection(db, "users");


    useEffect(() => {
        const getData = async () => {
            if (!loggedIn) {
                return;
            }
            const docref = doc(db, 'users', auth.currentUser.uid);
            const docSnap = await getDoc(docref);
            if (docSnap.exists()) {
                setWatchList(docSnap.data().coinList);
            }
        }
        getData();


    }, [loggedIn])





    const updateList = async () => {
        await setDoc(doc(db, 'users', auth.currentUser.uid), {
            coinList: watchlist
        })
    }

    const setList = (list) => {
        setWatchList(list);
    }


    const addToList = async (value) => {
        setWatchList((prev) => [...prev, value]);
    }

    const removeFromList = async (value) => {
        const index = watchlist.indexOf(value);
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