const fs = require("fs");
const express = require("express");

const hostname = "127.0.0.1";
const app = express();
const port = 3000;

app.use(express.static("public"));

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
// //Delete a file
// setTimeout(() => {
//   fs.unlink(__dirname + "/new.js", (err) => {
//     console.log(err);
//   });
// }, 10000);

//express
app.get("/", (req, res) => {
  res.send("Welcome Bryan");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
