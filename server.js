// npm init/inquirer(npm install inquirer) /express (npm i express)/mysql2 (npm install --save mysql2)

//INIT EXPRESS
const app = express();

// CREATE ENDPOINTS/ROUTE HANDLERS--- accepting get request to an index route, which is the slash
app.get(`/`, function (req,res) {
res.send(`Hello World`);
});

//Listen on Port
app.listen(5000);

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