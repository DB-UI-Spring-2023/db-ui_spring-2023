const express = require('express')
const app = express()
const port = 8000

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
app.use(express.json())

// Connect to mysql
const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'LoginSystem'
})

connection.connect()

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


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.put('/parse', (req, res) => {
    console.log(req.body)
    
    try {
        const { first, last, age, admin } = req.body
        const name = `${first} ${last}`
        const isAdmin = admin ? "is an admin" : "is not an admin"

        res.status(200)
        res.send(`${name} is ${age} years old and ${isAdmin}`)
    } catch (err) {
        console.log(err)
    }
})

app.get('/db', (req, res) => {
    connection.query('SHOW TABLES', (err, rows, fields) =>{
        if (err) throw err

        console.log(rows)
        res.status(200)
        res.send(rows)
    })
})

app.post('/user', (req, res) => {
    const { first, last, age, admin } = req.body
    const query = `INSERT INTO users (first_name, last_name, age, admin) VALUES ('${first}', '${last}', ${age}, ${admin})`
    connection.query(query, (err, rows, fields) => {
        if (err) throw err

        console.log(rows)
        res.status(200)
        res.send("Successfully added user!")
    })
})

app.get('/users', (req, res) => {
    connection.query(`SELECT * FROM users`, (err, rows, fields) => {
        if (err) throw err

        res.status(200)
        res.send(rows)
    })
})

app.put('/users/clear', (req, res) => {
    connection.query(`DELETE FROM users`, (err, rows, fields) => {
        if (err) throw err

        res.status(200)
        res.send("Successfully cleared users!")
    })
})

// Start server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})