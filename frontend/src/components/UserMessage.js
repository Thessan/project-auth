import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { user } from '../reducers/user';



export const UserMessage = () => {
    const [username, setUsername] = useState("");
    const accessToken = useSelector((store) => store.user.login.accessToken);
    const userId = useSelector((store) => store.user.login.userId);
    const dispatch = useDispatch();
    const AUTH_URL =`http://thessan-rebeka-auth-api.herokuapp.com/sessions/${userId}/userMessage`;
    
    const handleLogout = () => {
    dispatch(user.actions.logout());
    };
    console.log(accessToken);

    fetch(AUTH_URL, {
    method: "GET",
    headers: { Authorization: `${accessToken}` },
    })
    .then((response) => response.json())
    .then((json) => {
        setUsername(json.username);
    });

    return (
    <>
        <div>
        <h1>Welcome {username} you are logged in!</h1>
        </div>
        <button onClick={handleLogout}>Log Out</button>
    </>
    );
};

