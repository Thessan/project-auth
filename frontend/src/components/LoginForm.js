import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components'

import {LoginButton} from './LoginButton'

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
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event) => {
    setUsername(event.target.value);
};

    const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    };

    return (
    <form className={classes.root} noValidate autoComplete="off">
        <LoginContainer>
        <WelcomeContainer>
            Please login
        </WelcomeContainer>
        <>
            <TextField
            id="Username"
            label="Username"
            value={username}
            onChange={handleUsernameChange}
            variant="outlined"
            />
        </>
        
        <>
            <TextField
            id="Password"
            label="Password"
            value={password}    
            onChange={handlePasswordChange}
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