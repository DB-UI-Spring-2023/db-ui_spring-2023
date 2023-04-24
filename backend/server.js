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

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
// Enable Cross-Origin Resource Sharing
const cors = require('cors')
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET","POST","PUT"],
    credentials: true

})) // This has to be before any routes

app.options('*', cors())
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    session({
        key: "userID",
        secret: "supersecret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 1000 * 60 * 60 * 24,
        },
    })
);

// Enable JSON parsing
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to mysql
const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'DB_UI'
})

connection.connect();

// API routes

app.post('/register', (req,res) => {

    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const createPass = req.body.createPass
    const privileges = req.body.privileges

    connection.query(
        "INSERT INTO DB_UI.Users (firstName, lastName, email, createPass, privileges) VALUES (?,?,?,?,?)",
        [firstName, lastName, email, createPass, privileges], (err, result) => {
          if (err){
            res.status(500).send({err: err});
          }
          else {
            req.session.user = {userID: result.insertId, email: email };
            res.sendStatus(201);
          }
    });
});

app.post('/post-listing', (req,res) => {

  const Title = req.body.title
  const Author = req.body.author
    const ISBN = req.body.isbn
    
    const bookCondition = req.body.bookCondition
    const bookFormat = req.body.bookFormat
    const Cost = req.body.cost
    const Seller = req.body.seller

    connection.query(
        "INSERT INTO DB_UI.Books (Title, Author, ISBN, bookCondition, bookFormat, Cost, Seller) VALUES (?,?,?,?,?,?,?)",
        [Title, Author, ISBN, bookCondition, bookFormat, Cost, Seller], (err, result) => {
        console.log(err)
        
    })
})

app.post('/remove-listing', (req, res) => {

  const bookID = req.body.bookID;

  connection.query(
      "DELETE FROM DB_UI.Books WHERE bookID = ?",
      [bookID], (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send("An error occurred while removing the listing.");
        } else {
          res.status(200).send("Listing removed successfully.");
        }
  });
});

app.get('/login', (req,res) => {
    if (req.session.user) {
        res.send({loggedIn: true, user: req.session.user})
    } else {
        res.send({loggedIn: false})
    }
})

app.post('/login', (req,res) => {

    const email = req.body.email
    const first = req.body.first
    const last = req.body.last

    const createPass = req.body.createPass

    connection.query(
        "SELECT * FROM DB_UI.Users WHERE email = ? AND createPass = ? ",
        [email, createPass], (err, result) => {
        
        if (err){
            res.send({err: err})
        }
        
        if (result.length > 0) {

            req.session.user = result;
            console.log(req.session.user)
            res.send(result)
            
        } else {

            //console.log({meassage: "Wrong Combination"})
            res.send({"msg": "Incorrect email or password credentials"})
        }
        
    })
})

// API endpoint for fetching sellers data
app.get('/sellers', (req, res) => {
  const query = "SELECT DISTINCT Seller FROM DB_UI.Books";

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error querying sellers data:", error);
      return res.status(500).json({ error: "Failed to fetch sellers data" });
    }
    // Send the fetched sellers data as JSON response
    res.json(results.map(result => result.Seller));
  });
});

// Add the following route to fetch book titles
app.get("/book-titles", (req, res) => {
  const query = "SELECT DISTINCT Title FROM DB_UI.Books";

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error querying book titles data:", error);
      return res.status(500).json({ error: "Failed to fetch book titles data" });
    }
    // Send the fetched book titles data as JSON response
    res.json(results.map(result => result.Title));
  });
});

app.get('/sellers/:email', (req, res) => {
  const { email } = req.params;
  connection.query(
    'SELECT * FROM DB_UI.Users WHERE email = ?',
    [email],
    (err, results) => {
      if (err) {
        console.error('Error querying seller data:', err);
        return res.status(500).json({ error: 'Failed to fetch seller data' });
      }
      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.status(404).json({ error: 'Seller not found' });
      }
    }
  );
});

app.get('/users/:email', (req, res) => {
  const email = req.params.email;

  const sql = 'SELECT * FROM DB_UI.Users WHERE email = ?';
  connection.query(sql, [email], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching users from the database.' });
    } else {
      res.status(200).json(results);
    }
  });
});

// Update profile
app.put('/profile/update-name', async (req, res) => {
  const { email, firstName, lastName } = req.body;
  const query = 'UPDATE DB_UI.Users SET firstName = ?, lastName = ? WHERE email = ?';

  connection.query(query, [firstName, lastName, email], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error updating profile', err });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'User not found' });
      } else {

        res.status(200).json({ message: 'Profile updated successfully' });
      }
    }
  });
});
app.put('/profile/update-password', async (req, res) => {
  const { email, password } = req.body;
  const query = 'UPDATE DB_UI.Users SET createPass = ? WHERE email = ?';

  connection.query(query, [password, email], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error updating profile', err });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'User not found' });
      } else {

        res.status(200).json({ message: 'Profile updated successfully' });
      }
    }
  });
});



// Delete listing
app.delete('/listing/:id', async (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM DB_UI.Books WHERE IBSN = ?';

  connection.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error deleting listing', err });
    } else {
      res.status(200).json({ message: 'Listing deleted successfully', result });
    }
  });
});

// app.get('/dashboard-books', (req, res) => {
//   const searchTerm = req.query;

//   const query = `
//     SELECT B.*, U.firstName AS SellerFirstName, U.lastName AS SellerLastName, U.email AS SellerEmail
//     FROM DB_UI.Books B
//     JOIN DB_UI.Users U ON B.Seller = U.email
//     WHERE B.Title LIKE '%${searchTerm}%' OR B.Author LIKE '%${searchTerm}%'`;


//   connection.query(query, (error, results) => {
//     if (error) {
//       console.error("Error querying books data:", error);
//       return res.status(500).json({ error: "Failed to fetch books data" });
//     }
//     // Send the fetched books data as JSON response
//     res.json(results);
//   });
// });

app.get('/dashboard-books', (req, res) => {
  const { searchTerm, minPrice, maxPrice } = req.query;
  // Prepare SQL query with placeholders for dynamic values
  const query = `
  SELECT B.*, U.firstName AS SellerFirstName, U.lastName AS SellerLastName, U.email AS SellerEmail
  FROM DB_UI.Books B
  JOIN DB_UI.Users U ON B.Seller = U.email
    WHERE (Title LIKE ? OR Author LIKE ?) AND Cost >= ? AND Cost < ?`;
  // Prepare values to replace placeholders in the SQL query
  // console.log(searchTerm,minPrice,maxPrice);
  const values = [
    `%${searchTerm}%`,
    `%${searchTerm}%`,
    parseFloat(minPrice) || 0,
    parseFloat(maxPrice) || Number.MAX_VALUE,
  ];
  // Execute the SQL query with the values
  connection.query(query, values, (error, results) => {
    if (error) {
      console.error("Error querying books data:", error);
      return res.status(500).json({ error: "Failed to fetch books data" });
    }
    // Send the fetched books data as JSON response
    res.json(results);
  });
});


// API endpoint for fetching books data
app.get('/books', (req, res) => {
  const { searchTerms, minPrice, maxPrice, sellers } = req.query;

  const searchTermsArray = searchTerms.split(",");
  let searchConditions = searchTermsArray.map((_, i) => "(B.Title LIKE ? OR B.Author LIKE ?)").join(" OR ");
  let values = searchTermsArray.flatMap(term => [`%${term}%`, `%${term}%`]);

  let query = `
    SELECT B.*, U.firstName AS SellerFirstName, U.lastName AS SellerLastName, U.email AS SellerEmail
    FROM DB_UI.Books B
    JOIN DB_UI.Users U ON B.Seller = U.email
    WHERE (${searchConditions}) AND B.Cost >= ? AND B.Cost <= ?`;

  if (sellers) {
    query += ` AND Seller IN (?)`;
  }

  values.push(parseFloat(minPrice) || 0);
  values.push(parseFloat(maxPrice) || Number.MAX_VALUE);

  if (sellers) {
    values.push(sellers.split(","));
  }

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error("Error querying books data:", error);
      return res.status(500).json({ error: "Failed to fetch books data" });
    }
    // Send the fetched books data as JSON response
    res.json(results);
  });
});





// API endpoint for fetching books data
app.get('/books/:email', (req, res) => {
  const email = req.params.email;

  const sql = 'SELECT * FROM DB_UI.Books WHERE Seller = ?';
  connection.query(sql, [email], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching books from the database.' });
    } else {
      res.status(200).json(results);
    }
  });
});


// Start server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
