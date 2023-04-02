import { createContext, useState } from "react";

const WatchlistContext = createContext();

export function WatchlistProvider({ children }) {


    const [watchlist, setWatchList] = useState([]);

    const addToList = (value) => {
        setWatchList((prev) => [...prev, value])
    }

    return (
        <WatchlistContext.Provider value={{ watchlist, addToList }}>{children}</WatchlistContext.Provider>
    )
}

export default WatchlistContext;