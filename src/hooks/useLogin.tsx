import { useState, useEffect } from 'react';
import client from '../api/axios';

interface useLoginState {
  error: string;
  token: string
}

export default function useLogin(username: string, password: string) {
  const [loginState, setLoginState] = useState<useLoginState>({ error: "", token: "" });

  useEffect(() => {
    async function login() {
      if (username !== '' && password !== '') {
        try {
          const result = await client.post('/login',
            JSON.stringify({
              username: username,
              password: password,
            }), {
            headers: {
              "Content-Type": "application/json",
            }
          })
          setLoginState({ error: '', token: result.data.token })
        } catch (error) {
          if(error.status === 401){
            setLoginState({ error: 'Invalid username or password.', token: '' })
          } else {
            setLoginState({ error: 'Network error. Please reload the page.', token: '' })
          }

        }
      }
    }
    login()
  });

  return loginState
}