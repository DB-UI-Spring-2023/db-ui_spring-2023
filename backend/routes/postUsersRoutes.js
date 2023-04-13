/*
 * Author:          Rudy Lucas
 * filename:        server.js
 * Date:            04-13-2023
 * Description:     This file represents backend functionality of
 *                  post routes, and will be exported to server.js
 */

const express = require("express");
module.exports = (connection) => {
  const router = express.Router();

  router.post("/login", (request, response) => {
    const email = request.body.email;
    const password = request.body.password;

    const query =
      "SELECT * FROM newuser WHERE email = ? AND password = ?";
    connection.query(query, [email, password], (error, result) => {
      if (error) {
        response.status(500).send({ error: error });
      } else if (result.length > 0) {
        response.status(200).send(result);
      } else {
        response.status(401).send({
          message: "Incorrect email or password credentials!",
        });
      }
    });
  });

  // create a user
  // 38: take fields in request.body and assign/record them to firstName, lastName, email, password
  // 39: insert data into the newuser table: firstName data = first_name column; lastName data = last_name column; etc
  // 40-41: send query to the connection; if there is an error, throws the error
  // 43-45: if successful, log the rows, and send a successful result to the user
  router.post("/newuser", (request, response) => {
    const { firstName, lastName, email, password } = request.body;
    const query = `INSERT INTO newuser (first_name, last_name, email, password) VALUES ('${firstName}', '${lastName}', '${email}', '${password}')`;
    connection.query(query, (error, rows, fields) => {
      if (error) throw error;

      console.log(rows);
      response.status(200);
      response.send("Successfully added a new user!");
    });
  });

  return router;
};
