const express = require("express");

const {
  users,
  createUser,
  findUser,
  updateAUser,
  deleteUser,
} = require("../controllers/users");

const router = express.Router();

//get all users
router.get("/", (req, res) => {
  res.send(users);
});

//add a user
router.post("/", createUser);

//Getting specific user
router.get("/:id", findUser);

//update a user
router.patch("/:id", updateAUser);

//deleting a user
router.delete("/:id", deleteUser);

module.exports = router;
