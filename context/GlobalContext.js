'use client'

import { createContext, useContext, useState } from "react"

// First you create your context. This is literally it
const GlobalContext = createContext();



// Then you create a provider, that actually provides this state to the components requesting it
export function GlobalProvider({children}){
  const [notifications, setNotifications] = useState(0);

    return (
        <GlobalContext.Provider value={{
            notifications, 
            setNotifications}}>

                {children}

        </GlobalContext.Provider>
    )
}

// create custom hook, to access this context in your files -- this is something new you have not done before.
export function useGlobalContext(){
    return useContext(GlobalContext);
}
