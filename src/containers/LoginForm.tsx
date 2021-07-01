import React, { useState } from "react";
import Cookies from 'js-cookie'
import { Formik } from "formik";
import * as Yup from "yup"; // used when validating with a pre-built solution
import useLogin from "../hooks/useLogin";
import { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { act } from "react-dom/test-utils";

interface LoginFormProps {
    handleLogin: () => void;
}

export default function LoginForm(props: LoginFormProps) {

    const [error, setError] = useState(false)
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    })
    const { handleLogin } = props
    const login = useLogin(credentials.username, credentials.password)

    useEffect(() => {
        if (login.token !== '') {
            act(()=>{
                setError(false)
                handleLogin()
                Cookies.set('Token', login.token)
            })

        } else if (login.error !== '') {
            setError(true)
        }
    },[credentials, login, handleLogin])



    const redirectRoute = <Redirect to='/dashboard' />
    const formikForm = <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values, { setSubmitting }) => {
            const { username, password } = values
            act(() => {
                setSubmitting(false);
                setCredentials({
                    username,
                    password
                })
            })
        }}
        validationSchema={Yup.object().shape({
            username: Yup.string().required('Required'),
            password: Yup.string().required('Required').min(8, "Password too short. (8 characters minimum)")
        })}
    >
        {props => {
            const {
                values,
                touched,
                errors,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit
            } = props;

            return (
                <div className="container">
                    <form className="card form" onSubmit={handleSubmit}>
                        <h2>Log in</h2>
                        {error
                            ? <label className="errorLabel">{login.error}</label>
                            : <> </>}
                        <div>
                            <label>Username</label>
                            <input
                                id='username-input'
                                name="username"
                                type="text"
                                placeholder="Enter your username"
                                value={values.username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={(errors.username && touched.username) ? "error" : "input"}
                            />
                            {errors.username && touched.username && (
                                <div className="input-feedback">{errors.username}</div>
                            )}
                        </div>
                        <div>
                            <label>Password</label>
                            <input
                                id='password-input'
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={(errors.password && touched.password) ? "error" : "input"}
                            />
                            {errors.password && touched.password && (
                                <div className="input-feedback">{errors.password}</div>
                            )}
                        </div>
                        <div style={{ margin: '0 auto', width: '100px' }}>
                            <button id="submit-id" type="submit" disabled={isSubmitting}>Sign in</button>
                        </div>
                    </form>
                </div>
            )
        }}
    </Formik>


    if (Cookies.get('Token'))
        return redirectRoute
    else
        return formikForm

};