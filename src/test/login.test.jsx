import Cookies from 'js-cookie';
import App from '../App';
import * as ReactDOM from 'react-dom';
import React from 'react';
import { fireEvent, waitFor, screen, render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';


describe("Login render Page", () => {

  let container

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    document.body.removeChild(container)
    container.remove()
  })

  it('Insert credentials - Login', async () => {
    act(() => {
      render(<App />, { wrapper: MemoryRouter })
    })

    const logIn = document.getElementById('loginNav')
    act(() => {
      fireEvent.click(logIn)
    })
    const usernameInput = document.getElementById('username-input')
    const passwordInput = document.getElementById('password-input')
    fireEvent.change(usernameInput, { target: { value: 'admin' } })
    fireEvent.change(passwordInput, { target: { value: 'password' } })

    const signIn = document.getElementById('submit-id')
    act(() => {
      fireEvent.click(signIn)
    })
  });

  it('Click on Logout', async () => {
    Cookies.set('Token', '9157bc44-2230-4831-a2b4-646ba039c03b')
    act(() => {
      render(<App />, { wrapper: MemoryRouter })
    })

    const logOut = document.getElementById('logoutNav')
    act(() => {
      fireEvent.click(logOut)
    })
  });
});