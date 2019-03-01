const axios = require("axios");
const bcrypt = require("bcryptjs");

const { authenticate, generateToken } = require("../auth/authenticate");

module.exports = server => {
  server.post("/api/register", register);
  server.post("/api/login", login);
  server.get("/api/jokes", authenticate, getJokes),
  server.get("api/users", getUsers);
};

const db = require("../database/helpers/userModel");

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
