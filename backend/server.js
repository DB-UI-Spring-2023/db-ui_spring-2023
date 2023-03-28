const express = require('express')
const app = express()
const port = 8000

// Enable Cross-Origin Resource Sharing
const cors = require('cors')
app.use(cors()) // This has to be before any routes

// Enable JSON parsing
app.use(express.json())


// Connect to mysql
const mysql = require('mysql2')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'LoginSystem'
  })


db.connect()


app.post('/register', (req,res) => {

    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const createPass = req.body.createPass
    const confirmPass = req.body.confirmPass

    db.query(
        "INSERT INTO LoginSystem.Users (firstName, lastName, email, createPass, confirmPass) VALUES (?,?,?,?,?)",
        [firstName, lastName, email, createPass, confirmPass], (err, result) => {
        console.log(err)
    })
})

app.post('/login', (req,res) => {

    const email = req.body.email
    const createPass = req.body.createPass
    const confirmPass = req.body.confirmPass

    db.query(
        "SELECT * FROM LoginSystem.Users WHERE email = ? AND createPass = ? AND confirmPass = ?",
        [email, createPass, confirmPass], (err, result) => {
        
        if (err){
            res.send({err: err})
        }

        if (result.length > 0) {

            console.log(result)
            res.send(result)
            
        } else {

            console.log({meassage: "Wrong Combination"})
            res.send({meassage: "Wrong Combination"})
        }
        
        
    })
})

// API routes
app.get('/', (req, res) => {
    res.send('Hello Clark!')
})

app.get('/db', (req, res) => {
    connection.query('SHOW TABLES', (err, rows, fields) =>{
        if (err) throw err

        console.log(rows)
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