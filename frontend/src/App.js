import React from 'react'
import { Provider } from 'react-redux'
import styled from 'styled-components'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import ReactDOM from 'react-dom';

import {SignupForm} from './components/SignupForm'
import {LoginHere} from './components/LoginHere'
import {LoginForm} from './components/LoginForm'
import {GoBack} from './components/GoBack'
import {user} from './reducers/user'

const reducer = combineReducers({ user: user.reducer });

const store = configureStore({ reducer });

export const App = () => {
  
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Wrapper>
              <Route path="/" exact>
                  <SignupForm />
                    <LoginHere />
              </Route>

              <Route path="/sessions" exact>
                <LoginForm />
                <GoBack />
              </Route>
          </Wrapper>
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

const Wrapper = styled.div `
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 400px;
  height: 500px;
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: solid 8px gainsboro;
  background-color: white;
  `