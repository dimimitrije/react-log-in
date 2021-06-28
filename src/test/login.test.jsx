import LoginForm from '../containers/LoginForm'
import App from '../App'
import * as ReactDOM from 'react-dom'
import React from 'react'
import { fireEvent, waitFor, screen } from '@testing-library/react'

describe("Login render Page", () => {
    
    let container

    beforeEach(() => {
      container = document.createElement('div')
      document.body.appendChild(container)
      ReactDOM.render(<App/>, container)
    })

    afterEach(() => {
      document.body.removeChild(container)
      container.remove()
    })

    it('Insert credentials', async () => {
      const usernameInput = document.getElementById('username-input')
      const passwordInput = document.getElementById('password-input')
      fireEvent.change(usernameInput, { target: { value: 'admin' } })
      fireEvent.change(passwordInput, { target: { value: 'password' } })

      const signIn = document.getElementById('submit-id')
      fireEvent.click(signIn)
    });
  });