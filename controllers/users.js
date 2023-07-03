const { v4: uuidv4 } = require("uuid");

let users = [];

const createUser = (req, res) => {
  const user = req.body;
  const userId = uuidv4();
  const userWithId = { ...user, id: userId };
  users.push(userWithId);
  console.log(userWithId);
  res.send(`User with the first name ${user.firstName} added to the database`);
};

const findUser = (req, res) => {
  const findUser = users.find((user) => user.id == req.params.id);
  res.send(
    `You are ${findUser.firstName} ${findUser.lastName} of age ${findUser.age}`
  );
};

const updateAUser = (req, res) => {
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
};

const deleteUser = (req, res) => {
  const { id } = req.params;

  users = users.filter((user) => user.id != id);
  res.send(filteredUsers);
};

module.exports = { users, createUser, findUser, updateAUser, deleteUser };
