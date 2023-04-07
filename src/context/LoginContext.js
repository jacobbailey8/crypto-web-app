import { createContext, useState } from "react";


const LoginContext = createContext();

export function LoginProvider({ children }) {

    const [loginOpen, setLoginOpen] = useState(false);

    const openLogin = () => {
        if (!loginOpen) {
            setLoginOpen(true);
        }
    }
    const closeLogin = () => {
        if (loginOpen) {
            setLoginOpen(false);
        }

    }
    return (
        <LoginContext.Provider value={{ loginOpen, openLogin, closeLogin }}>{children}</LoginContext.Provider>
    )
}

export default LoginContext;