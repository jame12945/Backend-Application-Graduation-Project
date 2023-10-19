var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var app = express()

app.use(cors())

const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'systemdb'
  });

app.post('/user', jsonParser,function (req, res, next) {
    connection.execute(//INSERT INTO + table in db name
        'INSERT INTO user(Username,Password,Firstname,Lastname,Phone,Email,IsHost,FaceData,FaceImageFile) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [   
            req.body.Username,
            req.body.Password,
            req.body.Firstname,
            req.body.Lastname,
            req.body.Phone,
            req.body.Email,
            req.body.IsHost,
            req.body.FaceData,
            req.body.FaceImageFile,
        ],
        function(err, results, fields) {
          if(err){
            res.json({status : "error", message:err})
            return
          }
          res.json({status : 'ok'})
        }
      );
  
})

app.post('/reservations', jsonParser,function (req, res, next) {
   connection.execute(//INSERT INTO + table in db name
       'INSERT INTO reservation(UserId,RoomId,Date,StartTime,EndTime,RoomNum,Name) VALUES ( ?, ?, ?, ?, ?, ?, ?)',
       [   
           req.body.UserId,
           req.body.RoomId,
           req.body.Date,
           req.body.StartTime,
           req.body.EndTime,
           req.body.RoomNum,
           req.body.Name,
          
       ],
       function(err, results, fields) {
         if(err){
           res.json({status : "error", message:err})
           return
         }
         res.json({status : 'ok'})
       }
     );
 
})

app.get('/testget', (req, res) => {
   res.send('Hello, World!!!!');
 });

app.listen(3333, function () {
  console.log('localhost:3333 + /pathname')
})

// ..........................................
// const express =require('express');
// const {Server} =require('ws')
// const PORT = process.env.PORT || 3000
// const server = express().use((req,res) => res.send('Hello jame two')).listen(PORT, () => console.log(`Listening on ${PORT}`));
// const wss = new Server({server});
// wss.on('connection',ws=>{
//    console.log('Client connected');
//    ws.on('message', message => console.log(`Recieved: ${message}`));
//    ws.on('close', () => console.log('Client Disconnected'));

// })