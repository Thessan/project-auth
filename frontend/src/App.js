import React from 'react';
import styled from 'styled-components'
// import ReactDOM from 'react-dom';
/* import Button from '@material-ui/core/Button'; */

import {SignupButton} from './components/SignupButton'
import {SignupForm} from "./components/SignupForm"

export const App = () => {
  return (
    <Wrapper>
    <FormContainer>
      <SignupForm />
    </FormContainer>

    <ButtonContainer>
      <SignupButton />
    </ButtonContainer>
    </Wrapper>
  )
}

const Wrapper = styled.div `
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
margin: auto;
position: absolute;
top: 0;
left: 0;
right: 0;
bottom: 0;
`

const FormContainer = styled.div`

`

const ButtonContainer = styled.div`

`
