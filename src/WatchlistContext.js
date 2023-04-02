import { createContext, useState } from "react";

const WatchlistContext = createContext();

export function WatchlistProvider({ children }) {


    const [watchlist, setWatchList] = useState([]);
    const [currentCoin, setCurrentCoin] = useState('bitcoin');

    const addToList = (value) => {
        setWatchList((prev) => [...prev, value])
    }

    const changeCurrentCoin = (id) => {
        setCurrentCoin(id);
    }

    return (
        <WatchlistContext.Provider value={{ watchlist, currentCoin, addToList, changeCurrentCoin }}>{children}</WatchlistContext.Provider>
    )
}

export default WatchlistContext;