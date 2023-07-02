const express = require("express");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

let users = [];

//get all users
router.get("/", (req, res) => {
  res.send(users);
});

//add a user
router.post("/", (req, res) => {
  const user = req.body;
  const userId = uuidv4();
  const userWithId = { ...user, id: userId };
  users.push(userWithId);
  console.log(userWithId);
  res.send(`User with the first name ${user.firstName} added to the database`);
});

//Getting specific user
router.get("/:id", (req, res) => {
  const findUser = users.find((user) => user.id == req.params.id);
  res.send(
    `You are ${findUser.firstName} ${findUser.lastName} of age ${findUser.age}`
  );
});

//update a user
router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, age } = req.body;
  const updateUser = users.find((user) => user.id == id);

  if (firstName) {
    updateUser.firstName = firstName;
  }
  if (lastName) {
    updateUser.lastName = lastName;
  }
  if (age) {
    updateUser.age = age;
  }
});

//deleting a user
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  users = users.filter((user) => user.id != id);
  res.send(filteredUsers);
});

module.exports = router;
