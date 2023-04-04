const express = require("express");
const app = express();
const port = 8000;

// Enable Cross-Origin Resource Sharing
const cors = require("cors");
app.use(cors()); // This has to be before any routes

// Enable JSON parsing
app.use(express.json());

// Connect to mysql
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "#ponyUp2023!",
  database: "newuser_db",
});

connection.connect();

// API routes
app.get("/", (request, response) => {
  response.send("Hello World!");
});

app.put("/parse", (request, response) => {
  console.log(request.body);

  try {
    const { firstName, lastName } = request.body;
    const name = `${firstName} ${lastName}`;
    const message = `${firstName} ${lastName} is a new user!`;

    response.status(200);
    response.send(message);
  } catch (err) {
    console.log(err);
  }
});

app.get("/db", (request, response) => {
  connection.query("SHOW TABLES", (error, rows, fields) => {
    if (error) throw error;

    console.log(rows);
    response.status(200);
    response.send(rows);
  });
});
// create a user
// 58: take fields in request.body and assign/record them to firstName, lastName, email, password
// 59: insert data into the newuser table: firstName data = first_name column; lastName data = last_name column; etc
// 60-61: send query to the connection; if there is an error, throws the error
// 63-65: if successful, log the rows, and send a successful result to the user
app.post("/user", (request, response) => {
  const { firstName, lastName, email, password } = request.body;
  const query = `INSERT INTO newuser (first_name, last_name, email, password) VALUES ('${firstName}', '${lastName}', '${email}', '${password}')`;
  connection.query(query, (error, rows, fields) => {
    if (error) throw error;

    console.log(rows);
    response.status(200);
    response.send("Successfully added a new user!");
  });
});
// 69-76: shows all of the users in the table
app.get("/users", (request, response) => {
  connection.query(`SELECT * FROM newuser`, (error, rows, fields) => {
    if (error) throw error;

    response.status(200);
    response.send(rows);
  });
});
// 78-84: deletes all of the results from users in case you want to clear them
app.put("/users/clear", (request, response) => {
  connection.query(`DELETE FROM newuser`, (error, rows, field) => {
    if (error) throw error;
    response.status(200);
    response.send("Successfully deleted users!");
  });
});

// Start server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
