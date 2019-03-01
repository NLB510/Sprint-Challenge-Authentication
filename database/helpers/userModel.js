const db = require("../dbConfig");

module.exports = {
  addUser,
  findById,
  getUsers,
  findUserByName
};

function getUsers() {
  return db("users");
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}

function addUser(user) {
  return db("users")
    .insert(user)
    .then(([id]) => findById(id));
}


function findUserByName(username) {
  return db("users")
    .where("username", username)
    .first();
}