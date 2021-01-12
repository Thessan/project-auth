import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export const SignupForm = () => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          id="Username"
          label="Username"
          value={username}
          onChange={handleUsernameChange}
          variant="outlined"
        />
      </div>
      <div>
        <TextField
          id="Email"
          label="Email"
          value={email}
          onChange={handleEmailChange}
          variant="outlined"
        />
      </div>
      <div>
        <TextField
          id="Password"
          label="Password"
          value={password}
          onChange={handlePasswordChange}
          variant="outlined"
        />
      </div>
    </form>
  );
}