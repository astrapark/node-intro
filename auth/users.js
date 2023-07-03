const express = require("express");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

const credentials = [];

router.get("/users", (req, res) => {
  res.json(credentials);
});

//register a user
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    credentials.push({
      id: uuidv4(),
      username: username,
      password: hashedPassword,
    });
    res.status(201).send();
  } catch (e) {
    res.status(500).send();
  }
});

//login a user
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const logUser = credentials.find((user) => user.username == username);
  if (logUser) {
    try {
      if (await bcrypt.compare(password, logUser.password)) {
        res.status(201).json(logUser);
      } else {
        res.status(500).send("Wrong Password");
      }
    } catch {
      res.status(500).send("An error occurred!!!");
    }
  } else {
    res.status(500).send("No user available in the database");
  }
});
module.exports = router;
