import { createContext, useState, useEffect } from "react";
import { getDoc, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from "./firebase";
import { auth } from "./firebase";

const WatchlistContext = createContext();

export function WatchlistProvider({ children }) {


    const [watchlist, setWatchList] = useState([]);
    const [currentCoin, setCurrentCoin] = useState('bitcoin');
    const [loggedIn, setLoggedIn] = useState(false);


    const watchlistCollection = collection(db, "watchlist");



    // useEffect(() => {
    //     const getWatchlist = async () => {
    //         // read the data from database and set watchlist state to data
    //         try {
    //             if (auth.currentUser != null) {
    //                 const docRef = doc(db, "watchlist",)
    //                 const data = await getDoc(docRef)
    //                 const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    //                 setWatchList(filteredData[0].coinList);
    //             }

    //         } catch (err) {
    //             console.error(err);
    //         }

    //     }
    //     getWatchlist();

    // }, [])


    const addToList = (value) => {
        setWatchList((prev) => [...prev, value])
    }

    const changeCurrentCoin = (id) => {
        setCurrentCoin(id);
    }

    const changeLoggedIn = (val) => {
        setLoggedIn(val);
    }



    return (
        <WatchlistContext.Provider value={{ watchlist, currentCoin, loggedIn, addToList, changeCurrentCoin, changeLoggedIn }}>{children}</WatchlistContext.Provider>
    )
}

export default WatchlistContext;