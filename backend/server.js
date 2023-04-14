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


app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    session({
        key: "userID",
        secret: "supersecret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60 * 60 * 24,
        },
    })
);

// Enable JSON parsing
app.use(express.json());

// Connect to mysql
const mysql = require('mysql2')

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

    connection.query(
        "INSERT INTO DB_UI.Users (firstName, lastName, email, createPass) VALUES (?,?,?,?)",
        [firstName, lastName, email, createPass], (err, result) => {
          if (err){
            res.send({err: err})
          }
          res.send(result);
    })
})

app.post('/post-listing', (req,res) => {

    const IBSN = req.body.ibsn
    const Title = req.body.title
    const Author = req.body.author
    const bookCondition = req.body.bookCondition
    const bookFormat = req.body.bookFormat
    const Cost = req.body.cost

    connection.query(
        "INSERT INTO DB_UI.Books (IBSN, Title, Author, bookCondition, bookFormat, Cost) VALUES (?,?,?,?,?,?)",
        [IBSN, Title, Author, bookCondition, bookFormat, Cost], (err, result) => {
        console.log(err)
        
    })
})

app.get('/login', (req,res) => {
    if (req.session.user) {
        res.send({loggedIn: true, user: req.session.user})
    } else {
        res.send({loggedIn: false})
    }
})

app.post('/login', (req,res) => {

    const email = req.body.email
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
            res.send({"msg": "Wrong Combination"})
        }
        
    })
})

// API endpoint for fetching books data
app.post('/books', (req, res) => {
  const searchTerm = req.query.search || "";

  // Construct SQL query with search term
  const query = `SELECT * FROM DB_UI.Books WHERE Title LIKE '%${searchTerm}%' OR Author LIKE '%${searchTerm}%'`;

  // Fetch data from MySQL database
  connection.query(query, (error, results) => {
    if (error) {
      console.log("Error fetching books:", error);
      return res.status(500).json({ error: "Error fetching books" });
    }

    // Send retrieved data as JSON response
    res.json(results);
  });
});


// Start server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
