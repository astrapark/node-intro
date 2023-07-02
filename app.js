//modules
const fs = require("fs").promises;
const express = require("express");
const bodyParser = require("body-parser");

//routes
const usersRoute = require("./routes/users");

const hostname = "127.0.0.1";
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.json());

//routes
app.use("/users", usersRoute);

//Global Objects - objects available on all modules
console.log(__dirname);
console.log(__filename);

// //*Core Modules*

// //File System
// //creating a file --- also replaces the specified file
// fs.writeFileSync("new.js", "//This is the content of the file created \n");
// //Appending a file
// setTimeout(() => {
//   fs.appendFileSync(__dirname + "/new.js", 'console.log("Hello Bryan")');
// }, 3000);
// //reading a file contents
// const data = fs.readFileSync(__dirname + "/hello.js", "utf8");
// console.log(data);
// fs.readFile(__dirname + '/hello.js','utf-8',(err,txt) =>{
//   console.log(txt)
// })
// //Delete a file
// setTimeout(() => {
//   fs.unlink(__dirname + "/new.js", (err) => {
//     console.log(err);
//   });
// }, 10000);

const users = [
  {
    firstName: "John",
    lastName: "Doe",
    age: 24,
  },
  {
    firstName: "Jane",
    lastName: "Doe",
    age: 15,
  },
];

//express
app.get("/", async (req, res) => {
  res.send(await fs.readFile("./home.html", "utf-8"));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
