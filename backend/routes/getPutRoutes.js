/*
 * Author:          Rudy Lucas
 * filename:        server.js
 * Date:            04-13-2023
 * Description:     This file represents backend functionality of
 *                  get and put routes, and will be exported to server.js
 */

const express = require("express");
module.exports = (connection) => {
  const router = express.Router();

  router.get("/", (request, response) => {
    response.send("Hello World!");
  });

  router.put("/parse", (request, response) => {
    console.log(request.body);

    try {
      const { firstName, lastName } = request.body;
      const name = `${firstName} ${lastName}`;
      const message = `${firstName} ${lastName} is a new user!`;

      response.status(200);
      response.send(message);
    } catch (error) {
      console.log(error);
    }
  });

  router.get("/db", (request, response) => {
    connection.query("SHOW TABLES", (error, rows, fields) => {
      if (error) throw error;

      console.log(rows);
      response.status(200);
      response.send(rows);
    });
  });

  // 44-53: shows all of the users in the table
  router.get("/newusers", (request, response) => {
    connection.query(
      `SELECT * FROM newuser`,
      (error, rows, fields) => {
        if (error) throw error;

        response.status(200);
        response.send(rows);
      }
    );
  });
  // 55-61: deletes all of the results from users in case you want to clear them
  router.put("/newusers/clear", (request, response) => {
    connection.query(`DELETE FROM newuser`, (error, rows, field) => {
      if (error) throw error;
      response.status(200);
      response.send("Successfully deleted users!");
    });
  });

  return router;
};
