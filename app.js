var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var app = express()
//hash
const bcrypt = require('bcrypt');
const saltRounds = 10;
//token
var jwt = require('jsonwebtoken');
const secret = 'login-2023'
// var token = jwt.sign({ foo: 'bar' }, 'shhhhh');


app.use(cors())

const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'projectfinaldb'
  });

app.post('/register', jsonParser,function (req, res, next) {
    const attendeeid = 1
    connection.execute(//INSERT INTO + table in db name
        'INSERT INTO user_insystem(user_username,user_password,user_Fname,user_Lname,user_phone,user_email,user_ishost,user_faceimagefile,attendee_id) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [   
            req.body.user_username,
            req.body.user_password,
            req.body.user_Fname,
            req.body.user_Lname,
            req.body.user_phone,
            req.body.user_email,
            req.body.user_ishost,
            req.body.user_faceimagefile,
            attendeeid
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
//use token here
app.post('/login', jsonParser, function (req, res, next) {
  if (req.body.user_email === undefined || req.body.user_password === undefined) {
    res.json({ status: "error", message: "Missing user_email or user_password" });
    return;
  }

  console.log('Received request with user_email:', req.body.user_email);

  connection.execute(
    'SELECT * FROM user_insystem WHERE user_email=? AND user_password=?', // เปรียบเทียบรหัสผ่านแบบไม่เข้ารหัส
    [req.body.user_email, req.body.user_password],
    function(err, user_insystem, fields) {
      if (err) {
        console.log('Error while querying the database:', err);
        res.json({ status: "error", message: err });
        return;
      }
      console.log('user_insystem:', user_insystem);

      if (user_insystem.length === 0) {
        console.log('No users found in the database or passwords do not match.');
        res.json({ status: "error", message: 'No users found or passwords do not match' });
        return;
      }

      console.log('Login successful.');
      res.json({ status: 'ok', message: 'Login success' });
    }
  );
});



app.post('/reservations', jsonParser, function (req, res, next) {
  // ดึง "User_Id" จากการเข้าสู่ระบบ (คำสั่งหรือโทเคนการเข้าสู่ระบบ)
  const userId =10; // ตั้งชื่อตามตัวแปรที่คุณใช้
  // ต้องทำ token ก่อนตรงนี้ถึงใช้ได้ค่าเลข 6 คือId ที่อยู่ในตาราง User (mock ไว้)
  // const userId=req.user.Id;   
  // ไม่ต้องระบุ "User_Id" ในข้อมูลที่ส่งมาใน Postman หรือคำสั่ง SQL INSERT
  connection.query(
    'INSERT INTO reservation(RoomId, Date, StartTime, EndTime, RoomNum,  User_Id) VALUES (?, ?, ?, ?, ?, ?)',
    [
      req.body.RoomId,
      req.body.Date,
      req.body.StartTime,
      req.body.EndTime,
      req.body.RoomNum,
      userId // ใช้ "User_Id" ที่ได้จากการเข้าสู่ระบบ
    ],
    function (err, results, fields) {
      if (err) {
        res.json({ status: "error", message: err });
      } else {
        res.json({ status: 'ok' });
      }
    }
  );
});


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
//................................................


/////start
// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({
//       extended:true
// }))
// const productData = []
// app.listen(2000, function () {
//   console.log('Connected to Server at 2000');
// })

// app.post("/api/add_product",  (req, res) =>{

//    console.log("Result",req.body);
//    const pdata = {
//        "id": productData.length+1,
//        "pname": req.body.pname,
//        "pphone": req.body.pphone,
//        "pemail":req.body.pemail

//    };

//    productData.push(pdata);
//    console.log("Final",pdata);

//    req.status(200).send({
//     "status_code": 200,
//     "message":"Product added successfully",
//     "product": pdata
//    })


// })

// //End test
