const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');

//Environment variables
const dotenv = require('dotenv');

app.use(express.json());
app.use(cors());
dotenv.config();



const db  = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})

db.connect((error) => {
  if(error){
    console.log(`Error connecting`, error);
    return;
  }
  console.log(`DB Connected! Id Connection: `, db.threadId);
});


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
// Question 1 goes here

app.get('/patients', (req, res) => {

  db.query('SELECT * FROM patients', (error, results) =>{
    if(error){
      console.error(error);
      res.status(500).send('Error retrieving patients data! ')
    }
    else{
      res.render('patients', {results:results});
    }
  });
});

// Question 2 goes here
app.get('/providers', (req, res) => {

  db.query('SELECT * FROM providers', (error, results) =>{
    if(error){
      console.error(error);
      res.status(500).send('Error retrieving providers data! ')
    }
    else{
      res.render('providers', {results:results});
    }
  });
});

// Question 3 goes here
app.get('/patients/:firstName', (req, res) => {
  const firstName = req.params.firstName;


  db.query('SELECT * FROM patients WHERE first_name = ?', [firstName], (error, results) =>{
    if(error){
      console.error(error);
      res.status(500).send('Error retrieving patients with their first name! ')
    }
    else{
      res.render('patients', {results:results});
    }
  });
});

// Question 4 goes here
app.get('/providers/:providerSpecialty', (req, res) => {
  const providerSpecialty = req.params.providerSpecialty;


  db.query('SELECT * FROM providers WHERE provider_specialty = ?', [providerSpecialty], (error, results) =>{
    if(error){
      console.error(error);
      res.status(500).send('Error retrieving providers with their specialty! ')
    }
    else{
      res.render('providers', {results:results});
    }
  });
});


// listen to the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);

  console.log('Send info to the browser...');

  app.get('/', (req,res) => {
    res.send('Info is coming!');
  });

});