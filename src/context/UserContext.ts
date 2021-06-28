import React from 'react'

export interface UserContextProps {
    username: string;
    firstName: string;
    lastName: string;
    setUser: (username: string, firstName: string, lastName: string) => void;
}

const UserContext = React.createContext({
    username: '',
    firstName: '',
    lastName: '',
    setUser: (username: string, firstName: string, lastName: string) => {},
  });

export const UserProvider = UserContext.Provider
export default UserContext