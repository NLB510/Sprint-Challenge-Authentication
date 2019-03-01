const db = require("../database/helpers/userModel");
const axios = require("axios");
const bcrypt = require("bcryptjs");

const { authenticate, generateToken } = require("../auth/authenticate");

module.exports = server => {
  server.post("/api/register", register);
  server.post("/api/login", login);
  server.get("/api/jokes", authenticate, getJokes),
  server.get("/api/users", getUsers);
};



function register(req, res) {
  // implement user registration
  const user = req.body;

  if (!user.username || !user.password) {
    return res.status(400).json({
      errorMessage: "Please include a username and password"
    });
  } else {
    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;

    db.addUser(user)
      .then(user => {
        const token = generateToken(user);
        res.status(201).json({
          message: "Registration Success",
          user,
          token
        });
      })
      .catch(err => {
        res.status(500).json({
          errorMessage: "There was an error registering to the database."
        });
      });
  }
}

function getUsers(req, res) {
  db.getUsers()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error retrieving users from the database."
      });
    });
}

function login(req, res) {
  // implement user login
  const {username, password} = req.body
  

  if (!username || !password) {
    return res.status(400).json({
      message: "Please include a username and password"
    });
  } else {
    db.findUserByName(username)
      .then(user => {
        console.log('LINE 68', user)
        
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user);
          res.status(200).json({
            message: `Welcome ${username}!`,
            token
          });
        } else {
          res.status(401).json({
            message: "Invalid Credentials"
          });
        }
      })
      .catch(err => {
        res.status(500).json({
          errorMessage: "There was an error logging in"
        });
      });
  }



}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: "application/json" }
  };

  axios
    .get("https://icanhazdadjoke.com/search", requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: "Error Fetching Jokes", error: err });
    });
}
