import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components'

import {user} from '../reducers/user'
import {LoginButton} from './LoginButton'

const LOGIN_URL = 'http://thessan-rebeka-auth-api.herokuapp.com/sessions'

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
        },
    },
}));

export const LoginForm = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');  // CHANGED BACK TO SAME NAMING AS IN SIGNUP FORM, WOULD NOT WORK OTHERWISE
    const [password, setPassword] = useState('');
    const loginError = useSelector((store) => store.user.loginErrorMessage); // to display error message when login fail

    const handleLoginSuccess = (loginResponse) => {
        dispatch(
            user.actions.setAccessToken({ accessToken: loginResponse.accessToken })
        );
        dispatch(user.actions.setUserId({ userId: loginResponse.userId }));
        dispatch(user.actions.setStatusMessage({ statusMessage: 'Login success' }));
    };
    
    const handleLoginFailed = (loginFailed) => {
        dispatch(user.actions.setAccessToken({ accessToken: null }));
        dispatch(user.actions.setLoginErrorMessage({ loginErrorMessage: loginFailed }));
    };

    const onUsernameLoginChange = (event) => {
    setUsername(event.target.value);
    };

    const onPasswordLoginChange = (event) => {
    setPassword(event.target.value);
    };

    //fetch on login
    const onLogin = (event) => {
        event.preventDefault();

        fetch(LOGIN_URL, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
        })
        .then((response) => {
            if (!response.ok) {
                throw 'Sorry, could not login user';
            }
            return response.json();
        })
        .then((json) => handleLoginSuccess(json))
        .catch((err) => handleLoginFailed(err));
        console.log("Login function performed");

    }

    return (
    <form className={classes.root} onSubmit={onLogin} noValidate autoComplete="off">
        <LoginContainer>
        <WelcomeContainer>
            Please login
        </WelcomeContainer>
        <>
            <TextField
            id="UsernameLogin"
            label="Username"
            value={username}
            onChange={onUsernameLoginChange}
            variant="outlined"
            />
        </>
        
        <>
            <TextField
            id="PasswordLogin"
            label="Password"
            value={password}    
            onChange={onPasswordLoginChange}
            variant="outlined"
            type="password" // to hide the input while typing
            />
        </>
            <LoginButton />
            {loginError && <div className="div-error">{`${loginError}`}</div>}
        </LoginContainer>
    </form>
    );
}

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 280px;
`

const WelcomeContainer = styled.h1`
    color: darkblue;
    margin-top: -10x;
    padding-bottom: 15px;
`