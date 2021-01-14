import React, { useState } from 'react';
import { useDispatch} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components'

import {user} from '../reducers/user'
import {SignupButton} from './SignupButton'

const SIGNUP_URL = 'http://thessan-rebeka-auth-api.herokuapp.com/users'

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
        },
    },
}));

export const SignupForm = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignupSuccess = (signupResponse) => {
        dispatch(
            user.actions.setAccessToken({ accessToken: signupResponse.accessToken })
        );
        dispatch(user.actions.setUserId({ userId: signupResponse.userId }));
        dispatch(user.actions.setStatusMessage({ statusMessage: 'Signup success' }));
    };
    
    const handleSignupFailed = (signupError) => {
        dispatch(user.actions.setAccessToken({ accessToken: null }));
        dispatch(user.actions.setStatusMessage({ statusMessage: signupError }));
    };

    const onUsernameChange = (event) => {
    setUsername(event.target.value);
    };
    console.log(`Username: ${username}`);

    const onEmailChange = (event) => {
    setEmail(event.target.value);
    };
    console.log(`Email: ${email}`);

    const onPasswordChange = (event) => {
    setPassword(event.target.value);
    };
    console.log(`Password: ${password}`);

    const onSignup = (event) => {
        event.preventDefault();

        fetch(SIGNUP_URL, {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
        })
        .then((response) => {
            if (!response.ok) {
                throw 'Sorry, could not signup user';
            }
            return response.json();
        })
        .then((json) => handleSignupSuccess(json))
        .catch((err) => handleSignupFailed(err));
        console.log("Signup function performed");
    }

    return (
        <form className={classes.root} onSubmit={onSignup} noValidate autoComplete="off">
            <FormContainer>
            <WelcomeContainer>
                Welcome!
            </WelcomeContainer>
        <>
            <TextField
            id="Username"
            label="Username"
            value={username}
            onChange={onUsernameChange}
            variant="outlined"
            />
        </>

        <>
            <TextField
            id="Email"
            label="Email"
            value={email}
            onChange={onEmailChange}
            variant="outlined"
            type="email" // DOES NOT WORK!
            />
        </>
        
        <>
            <TextField
            id="Password"
            label="Password"
            value={password}    
            onChange={onPasswordChange}
            variant="outlined"
            type="password" // to hide the input while typing
            />
        </>
        <SignupButton />
        </FormContainer>
    </form>
    );
}

const FormContainer = styled.div`
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
