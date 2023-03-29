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

const loginDB = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'LoginSystem'
  })


loginDB.connect()


app.post('/register', (req,res) => {

    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const createPass = req.body.createPass
    const confirmPass = req.body.confirmPass

    loginDB.query(
        "INSERT INTO LoginSystem.Users (firstName, lastName, email, createPass, confirmPass) VALUES (?,?,?,?,?)",
        [firstName, lastName, email, createPass, confirmPass], (err, result) => {
        console.log(err)
    })
})

app.post('/login', (req,res) => {

    const email = req.body.email
    const createPass = req.body.createPass
    const confirmPass = req.body.confirmPass

    loginDB.query(
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



// Start server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})