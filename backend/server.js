import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt'

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

const User = mongoose.model('User', {
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: [5, "Password has to be longer than 4 characters!"]
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex'),
    unique: true
  }
})


// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

const authenticateUser = async (request, response, next) => {
  const user = await User.findOne({accessToken: request.header('Authorization')});
  if (user) {
    request.user = user;
    next();
  } else {
    response.status(401).json({ message: 'Sorry, authentication failed' });
  }
}

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

app.get('/', async (request, response) => {
  response.send('Welcome')
})


// Sign up
app.post('/users', async (request, response) => {
  try {
    const { username, email, password } = request.body;
    const salt = bcrypt.genSaltSync();
    const user = await new User ({
      username,
      email,
      password: bcrypt.hashSync(password, salt),
    }).save();
    response.status(200).json({ userID: user._id, accessToken: user.accessToken });
  }
  catch (err) {
    response.status(400).json({ message: 'Sorry, could not create user', errors: err});
  }
})

// Login
app.post('/sessions', async (request, response) => {
  try {
    const { username, email, password } = request.body;
    const user = await User.findOne({ username, email });
    if (user && bcrypt.compareSync(password, user.password)) {
      response.status(200).json({ userId: user._id, accessToken: user.accessToken }); //Success
    } else {
      throw 'Incorrect username, email or password'; // if user is signed up but login details are incorrect
    }
  } catch (err) {
    response.status(404).json({ error: 'Sorry, user does not exist' }); // if a user that's not signed up is trying to login
  }
});

app.post('/tweets', authenticateUser);
app.post('/tweets', async (request, response) => {

});

app.get('users/:id', async (request, response) => {
  response.status(501).send();
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
