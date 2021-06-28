import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../containers/Dashboard";
import LoginForm from "../containers/LoginForm";
import PrivateRoute from "./PrivateRoute";

interface AppRouterProps {
    isLoggedin: boolean;
    handleLogin: () => void
}

export default function AppRouter(props: AppRouterProps) {
    const { isLoggedin, handleLogin } = props
    return (
        <Router>
            <Switch>
                <Route exact path="/" render={() => <Redirect to='/login' />} />
                <Route path="/login" render={() => <LoginForm handleLogin={handleLogin} />} />
               <PrivateRoute path="/dashboard" isLoggedin={isLoggedin}>
                   <Dashboard />
               </PrivateRoute>
             </Switch>
        </Router>
    );
}