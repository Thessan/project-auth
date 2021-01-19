# Project Auth
Pair programming proejct by Therése Larsson & Rebeka Kovačič 

A fullstack project including signup and login forms, API with authentication and an authenticated endpoint with its content visible upon logging in. :closed_lock_with_key:   

## :brain: Learning objectives
- how to build a registration flow
- how to handle authentication, both in the frontend and in the backend
- how to authenticate users using tokens
- how to securely store passwords in our database
- how to think about security and defensive design when building frontend or backend code
- how to build a frontend and backend at the same time

## :heavy_check_mark: Features
Frontend:
- a registration/sign up form which sends a POST request to API endpoint for registration
- login form sending a POST request to an endpoint for login, to authenticate a returning user
- authenticated message revealed upon successful loggin in
- validated password and email
- displaying a status message when signing and/or logging in

Backend:
- API route to register
- API route to login
- an authenticated endpoint returning 401 (auth failed) if trying to be accessed by invalid access token or without it
- passwords in the database encrypted with bcrypt
- validated user password
- validated user email input using regex


## :chart_with_upwards_trend: Future improvements
- hiding the status message, when switching between the forms
- when registering, displaying error messages from the API next to the input field which has the error
- add more routes, perhaps even a `POST` route to create new objects in our database as a logged-in user


## :robot: Tech used 
- JavaScript
- mongoose
- Postman
- MongoDB
- Mongo Atlas
- Material UI

## :eyes: View it live
- Backend: https://thessan-rebeka-auth-api.herokuapp.com
- Frontend: https://thessan-rebeka-auth-api-frontend.netlify.app
