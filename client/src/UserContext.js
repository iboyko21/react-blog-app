// Context provides a way to pass data through the component tree 
// without having to pass props down manually at every level.
import { createContext } from "react";
import { useState } from 'react';

export const UserContext = createContext({});

export function UserContextProvider({children}) {
    const [userInfo,setUserInfo] = useState({});
    return (
        <UserContext.Provider value={{userInfo,setUserInfo}}>
            {children}
        </UserContext.Provider>
    );
}