var express = require('express')
var cors = require('cors')
var app = express()
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
const secret = 'Fullstack-Login-2021'


app.use(cors())

const mysql = require('mysql2');
// const req = require('express/lib/request');
// const { timeout } = require('nodemon/lib/config')
const connection = mysql.createConnection({
    // password: 'Kongilllk5555',
    host: 'localhost',
    user: 'root',
    database: 'projectfinaldb'
});




app.post('/register', jsonParser, function (req, res, next) {
  bcrypt.hash(req.body.user_password, saltRounds, function(err, hash) {
    // Store hash in your password DB.
    const attendeeid = 1
    connection.execute(
      'INSERT INTO user_insystem(user_username,user_password,user_fname,user_lname,user_phone,user_email,user_ishost,user_faceimagefile,attendee_id) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [    req.body.user_username,
           hash, 
           req.body.user_fname,
           req.body.user_lname,
           req.body.user_phone,
           req.body.user_email,
           req.body.user_ishost,
           req.body.user_faceimagefile,
           attendeeid],
      function (err, results, fields) {
       if (err) {
               res.json({status : 'error', message: err})
               return
       }
     
       res.json({status: 'ok'})
      }
);
});
       
     
})


app.post('/login', jsonParser, function (req, res, next) {
  connection.execute(
    'SELECT * FROM user_insystem WHERE user_email =?',
    [req.body.user_email],
    function (err, user_insystem, fields) {
     if (err) {
             res.json({status : 'error', message: err});
             return
     }
     if(user_insystem.length==0){
      res.json({status : 'error', message: 'no user found'});
      return
     }
     bcrypt.compare(req.body.user_password,user_insystem[0].user_password, function(err, isLogin) {
      // result == true
      if(isLogin){
        res.json({status : 'ok', message: 'login success'})
      }
      else{
        res.json({status : 'error', message: 'login failed'});
      }
  });
   

    }
);
})







app.listen(3333, function () {
    console.log('CORS-enabled web server listening on port 3333')
})