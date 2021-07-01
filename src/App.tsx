import Cookies from 'js-cookie';
import React, { useEffect, useState, useCallback } from 'react';
import client from './api/axios';
import './App.css';
import AppRouter from './components/AppRouter';
import CustomNavbar from './components/CustomNavbar';
import { UserContextProps, UserProvider } from './context/UserContext';

interface UserResult {
  data: {
    username: string;
    firstName: string;
    lastName: string;
  }
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const [userState, setUserState] = useState<UserContextProps>({
    username: '',
    firstName: '',
    lastName: '',
    setUser,
  })

  function setUser(username: string, firstName: string, lastName: string) {
    setUserState({
      ...userState,
      username,
      firstName,
      lastName
    })
  }

  const getUser = useCallback(async () => {
    try {
      const result: UserResult = await client.get('/user')
      const { username, firstName, lastName } = result.data
      setUserState({ ...userState, username, firstName, lastName })
    } catch (error) {
      console.log(error)
    }
  }, [userState])

  useEffect(() => {
    if (Cookies.get('Token')) {
      setLoggedIn(true)
      getUser()
    }
    // eslint-disable-next-line
  }, [])

  const handleLogin = () => {
    setLoggedIn(true)
    getUser()
  }

  const handleLogOut = () => {
    setLoggedIn(false)
    Cookies.remove('Token')
  }

  return (
    <div>
      <UserProvider value={userState}>
        <CustomNavbar isLoggedin={loggedIn} handleLogOut={handleLogOut} />
      </UserProvider>
      <AppRouter isLoggedin={loggedIn} handleLogin={handleLogin} />
    </div>
  );
}
