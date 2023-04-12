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
            expires: 60 * 60 * 10,
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
  database: 'LoginSystem'
})

connection.connect();

// API routes

app.post('/register', (req,res) => {

    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const createPass = req.body.createPass
    const confirmPass = req.body.confirmPass

    connection.query(
        "INSERT INTO LoginSystem.Users (firstName, lastName, email, createPass, confirmPass) VALUES (?,?,?,?,?)",
        [firstName, lastName, email, createPass, confirmPass], (err, result) => {
        console.log(err)
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
        "INSERT INTO LoginSystem.Books (IBSN, Title, Author, bookCondition, bookFormat, Cost) VALUES (?,?,?,?,?,?)",
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
    const confirmPass = req.body.confirmPass

    connection.query(
        "SELECT * FROM LoginSystem.Users WHERE email = ? AND createPass = ? AND confirmPass = ?",
        [email, createPass, confirmPass], (err, result) => {
        
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

// Start server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
