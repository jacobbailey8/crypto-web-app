import { createContext, useState } from "react";


const SidebarContext = createContext();

export function SidebarProvider({ children }) {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    }

    return (
        <SidebarContext.Provider value={{ sidebarOpen, toggleSidebar }}>{children}</SidebarContext.Provider>
    )
}

export default SidebarContext;