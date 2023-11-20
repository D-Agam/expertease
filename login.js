const express = require("express");
const app = express();
const mysql = require("mysql2");
const path = require('path');
app.use(express.urlencoded({ extended: true }));
const bodyParser = require('body-parser');
const e = require("express");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')))
const connection = mysql.createConnection({
  host: 'localhost',
  database: 'project',
  user: 'Agam7',
  password: 'AgamD'
}); 
app.get('/', (req, res) => {
  res.render('home.ejs');
});
app.get('/login', (req, res) => {
    res.render('login.ejs');
});
app.post('/login',(req,res)=>{
    let name=req.body.name;
    let password=req.body.password;
    let city = req.body.location;
    city = city.toLowerCase();    
    let isValid=true;
    connection.query(
        `select * from users where name=? and password=?`,
        [name, password],
        function(err, results) {
          if (err) {
            console.error(err);
          } else {
            if (results.length === 0) {
              isValid = false;
            } else {
              console.log("User Entered");
            }
          }
          if (isValid) {
            console.log("Success");
            console.log(city);
            if (city === "chandigarh") {
                res.render('chand.ejs',{name:name,city:city});
            } else if (city === "delhi/ncr") {
                res.render('delhi.ejs',{name:name,city:city});
            } else if (city === "mumbai") {
                res.render('mumbai.ejs',{name:name,city:city});
            } else if (city === "ahmedabad") {
                res.render('ahmedabad.ejs',{name:name,city:city});
            } else if (city === "kolkata") {
                res.render('kolkata.ejs',{name:name,city:city});
            }
          } else {
            alert("Invalid Details");
            res.redirect('/login');
          }
        }
      );
});
  
app.get('/signup', (req, res) => {
    res.render('signup.ejs');
});
app.post('/signup', (req, res) => {
  let name = req.body.name;
  let password = req.body.password;
  let isValid = true;
  let contact = req.body.contact;

  if (contact.length !== 10) {
      alert("Invalid phone number length. Please enter a valid phone number.");
      return res.redirect('/signup');
  }

  connection.query(
      'SELECT phonenumber FROM users WHERE phonenumber=?',
      [contact],
      function (err, results) {
          if (err) {
              console.log(err);
          } else {
              if (results.length !== 0) {
                  alert("User already exists. Please login.");
                  res.render('signup.ejs');
              } else {
                  connection.query(
                      'INSERT INTO users(name, password, phonenumber) VALUES (?, ?, ?)',
                      [name, password, contact],
                      function (err, results) {
                          if (err) {
                              console.error(err);
                              isValid = false;
                          } else {
                              console.log("User Entered");
                          }

                          if (isValid) {
                              res.render('login.ejs');
                          } else {
                              alert("Invalid details. Signup again.");
                              res.redirect('/signup');
                          }
                      }
                  );
              }
          }
      }
  );
});

app.post('/repair', (req, res) => {
  res.render('repair.ejs');  
});

app.post('/clean', (req, res) => {
  res.render('clean.ejs');  
});

app.post('/paint', (req, res) => {
  res.render('paint.ejs');  
});

app.post('/furniture', (req, res) => {
  res.render('furniture.ejs');  
});

app.post('/saloon', (req, res) => {
  res.render('salonhome.ejs');  
});

app.post('/genie', (req, res) => {
  res.render('genie.ejs');  
});
app.post('/salonm', (req, res) => {
  res.render('salonm.ejs');  
});
app.post('/salonw', (req, res) => {
  res.render('salonw.ejs');  
});
app.post('/salonw1', (req, res) => {
  res.render('salonw1.ejs');  
});
app.post('/hairw1', (req, res) => {
  res.render('hairw1.ejs');  
});
app.post('/nailw1', (req, res) => {
  res.render('nailw1.ejs');  
});
app.post('/spaw1', (req, res) => {
  res.render('spaw1.ejs');  
});
app.post('/spam1', (req, res) => {
  res.render('spam1.ejs');  
});
app.post('/salonm1', (req, res) => {
  res.render('salonm1.ejs');  
});
app.post('/confirmation', (req, res) => {
  res.render('confirmation.ejs');  
});
app.post('/salonm',(req,res)=>{
  res.render('salonm.ejs')
})
app.listen(3000, () => {
  console.log("Server started");
});
