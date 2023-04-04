import { createContext, useState, useEffect } from "react";
import { getDoc, collection, addDoc, deleteDoc, doc, updateDoc, setDoc } from 'firebase/firestore'
import { db } from "./firebase";
import { auth } from "./firebase";

const WatchlistContext = createContext();

export function WatchlistProvider({ children }) {

    // user state
    const [watchlist, setWatchList] = useState([]);
    const [currentCoin, setCurrentCoin] = useState('bitcoin');
    const [userID, setUserID] = useState(undefined);

    // global app log in status
    const [loggedIn, setLoggedIn] = useState(false);

    // state that can be used to force update of database
    const [change, setChange] = useState(0);

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




    const resetUserID = () => {
        setUserID(undefined);
    }
    const updateList = async () => {
        await setDoc(doc(db, 'users', auth.currentUser.uid), {
            coinList: watchlist
        })
    }


    const addToList = (value) => {
        setWatchList((prev) => [...prev, value]);
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
        <WatchlistContext.Provider value={{ watchlist, currentCoin, loggedIn, addToList, changeCurrentCoin, changeLoggedIn, resetList, resetUserID, updateList }}>{children}</WatchlistContext.Provider>
    )
}

export default WatchlistContext;