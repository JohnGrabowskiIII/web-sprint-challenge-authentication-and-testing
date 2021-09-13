
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const SECRET = require("../../config/secret")

const checkReqValid = require("../middleware/checkReqValid")
const checkNameUsed = require('../middleware/checkNameUsed')
const {find, insert} = require('../models')

const router = require('express').Router();

const tokenMaker = user => {

  const payload = {
    subject: user.id,
    username: user.username,
    role: user.role
  }

  const options = {
    expiresIn: "5m"
  }

  return jwt.sign(payload, SECRET, options)

}

router.post('/register', checkReqValid, checkNameUsed, async (req, res) => {

  let userInfo = req.body

  const hashRounds = process.env.BCRYPT_ROUNDS || 8
  const hashed = bcrypt.hashSync(userInfo.password, hashRounds)

  userInfo.password = hashed

  try {
    const newUser = await insert(userInfo)
    res.status(201).json(newUser)
  } catch(err) {
    res.status(500).json({message: "Unable to register user at this time"})
  }

  // res.end('implement register, please!');
  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.
    DO NOT EXCEED 2^8 ROUNDS OF HASHING!

    1- In order to register a new account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel", // must not exist already in the `users` table
        "password": "foobar"          // needs to be hashed before it's saved
      }

    2- On SUCCESSFUL registration,
      the response body should have `id`, `username` and `password`:
      {
        "id": 1,
        "username": "Captain Marvel",
        "password": "2a$08$jG.wIGR2S4hxuyWNcBf9MuoC4y0dNy7qC/LbmtuFBSdIhWks2LhpG"
      }

    3- On FAILED registration due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED registration due to the `username` being taken,
      the response body should include a string exactly as follows: "username taken".
  */
});

router.post('/login', checkReqValid, async (req, res) => {

  let {username, password} = req.body

  try {

    const user = await find(username)

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = tokenMaker(user)
      res.status(200).json({
        message: `welcome, ${user.username}`,
        token
      })
    } else {
      res.status(401).json({message: "invalid credentials"})
    }
  
  } catch(err) {
    res.status(500).json({message: "Unable to login at this time"})
  }

  // res.end('implement login, please!');
  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.

    1- In order to log into an existing account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel",
        "password": "foobar"
      }

    2- On SUCCESSFUL login,
      the response body should have `message` and `token`:
      {
        "message": "welcome, Captain Marvel",
        "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
      }

    3- On FAILED login due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
      the response body should include a string exactly as follows: "invalid credentials".
  */
});

module.exports = router;
