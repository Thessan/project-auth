import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    login: {
    accessToken: null,
    userId: 0,
    statusMessage: "",
    loginErrorMessage: ""
    },
};

export const user = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setAccessToken: (state, action) => {
            const { accessToken } = action.payload;
            state.login.accessToken = accessToken;
        },
        setUserId: (state, action) => {
            const { userId } = action.payload;
            state.login.userId = userId;
        },
        setStatusMessage: (state, action) => {
            const { statusMessage } = action.payload;
            state.login.statusMessage = statusMessage;
        },
        setLoginErrorMessage: (state, action) => {
            const { loginErrorMessage } = action.payload;
            state.login.loginErrorMessage = loginErrorMessage;
        },
        logout: (state, action) => {
            state.login.userId = 0;
            state.login.accessToken = null;
        },
    } 
})
