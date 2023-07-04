require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

const credentials = [];

router.get("/users", (req, res) => {
  res.json(credentials);
});

//token authentication
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null)
    return res.sendStatus(401).json({ message: "No token Available" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err)
      return res.sendStatus(403).json({ message: "Token is no longer valid" });
    req.user = user;
    next();
  });
};

//register a user
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = {
      id: uuidv4(),
      username: username,
      password: hashedPassword,
    };
    credentials.push(newUser);
    const accesstoken = jwt.sign(newUser, process.env.ACCESS_TOKEN_SECRET);
    res.status(201).json({ accesstoken: accesstoken });
  } catch (e) {
    res.status(500).send();
  }
});

//private url you cant access unless authorized
router.get("/details", authenticateToken, (req, res) => {
  res.send("Welcome our Premium user");
  res.send(req.user);
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
