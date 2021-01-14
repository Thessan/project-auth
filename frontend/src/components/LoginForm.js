import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
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
    const [usernameLogin, setUsernameLogin] = useState('');
    const [passwordLogin, setPasswordLogin] = useState('');

    const handleLoginSuccess = (loginResponse) => {
        dispatch(
            user.actions.setAccessToken({ accessToken: loginResponse.accessToken })
        );
        dispatch(user.actions.setUserId({ userId: loginResponse.userId }));
        dispatch(user.actions.setStatusMessage({ statusMessage: 'Login success' }));
    };
    
    const handleLoginFailed = (loginFailed) => {
        dispatch(user.actions.setAccessToken({ accessToken: null }));
        dispatch(user.actions.setStatusMessage({ statusMessage: loginFailed }));
    };

    const onUsernameLoginChange = (event) => {
    setUsernameLogin(event.target.value);
    };

    const onPasswordLoginChange = (event) => {
    setPasswordLogin(event.target.value);
    };

    //fetch on login
    const onLogin = (event) => {
        event.preventDefault();

        fetch(LOGIN_URL, {
        method: 'POST',
        body: JSON.stringify({ usernameLogin, passwordLogin }),
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
            value={usernameLogin}
            onChange={onUsernameLoginChange}
            variant="outlined"
            />
        </>
        
        <>
            <TextField
            id="PasswordLogin"
            label="Password"
            value={passwordLogin}    
            onChange={onPasswordLoginChange}
            variant="outlined"
            type="password" // to hide the input while typing
            />
        </>
            <LoginButton />
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