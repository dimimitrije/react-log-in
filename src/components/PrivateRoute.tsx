import React from 'react'
import { Redirect, Route } from 'react-router-dom'

export default function PrivateRoute({ children, isLoggedin, ...rest }: any) {
    return (
        <Route {...rest} render={(location) => {
            return isLoggedin
                ? children
                : <Redirect to='/login'/>
        }} />
    )
};