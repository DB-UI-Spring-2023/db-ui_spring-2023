/*
 * Author:          Rudy Lucas
 * filename:        server.js
 * Date:            04-13-2023
 * Description:     This file represents the backend functionality;
 *                  server.js will import relevant files
 */


const express = require("express");
const app = express();
const port = 8000;

// Enable Cross-Origin Resource Sharing
const cors = require("cors");
app.use(cors()); // This has to be before any routes

// Enable JSON parsing
app.use(express.json());

// Connect to mysql
const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "#ponyUp2023!",
  database: "dbui",
});

connection.connect();

// import routers
const postUsersRouter = require('./routes/postRoutes')(connection);
const getPutRouter = require('./routes/getPutRoutes')(connection);

// mount the routers
app.use(postUsersRouter);
app.use(getPutRouter);

// Start server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
