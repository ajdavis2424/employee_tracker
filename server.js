// npm init/inquirer(npm install inquirer) /express (npm i express)/mysql2 (npm install --save mysql2)
// Installed CONSOLE TABLE PACKAGE (this allosw me to print myql rows to console) --> npm install console.table --save  // bower install console.table --save

// MYSQL login -- mysql -u root -p
// MAKE DATABASE IN TERMINAL

const express = require('express');
//INIT EXPRESS
const app = express();

// IMPORT & REQUIRE MYSQL2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3306;
// CREATE ENDPOINTS/ROUTE HANDLERS--- accepting get request to an index route, which is the slash
app.get('/', (req, res) => res.send('Navigate to /send or /routes'));

app.get('/send', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/sendFile.html'))
);

//Listen on Port
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});

// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'test'
});

// simple query
connection.query(
  'SELECT * FROM `table` WHERE `name` = "Page" AND `age` > 45',
  function(err, results, fields) {
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  }
);

// with placeholder
connection.query(
  'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
  ['Page', 45],
  function(err, results) {
    console.log(results);
  }
);