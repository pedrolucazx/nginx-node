const mysql = require("mysql2/promise");
const express = require("express");
const app = express();

const PORT = 3000;
const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};

async function insertPersonAndRetrieve(name) {
  const connection = await mysql.createConnection(config);
  await connection.query(`CREATE TABLE people(id int not null auto_increment, name varchar(255), primary key(id))`);
  await connection.query(`INSERT INTO people(name) values ('${name}')`);
  const [rows] = await connection.execute(`SELECT * FROM people WHERE name='${name}'`);
  connection.end();
  return rows[0].name;
}

let personName = '';
insertPersonAndRetrieve('João Fabio')
  .then((name) => {
    personName = name;
    app.get("/", (req, res) => res.send(`<h1>Full Cycle Rocks! ${personName}</h1>`));
    app.listen(PORT, () => console.log(`Server is running port ${PORT}`));
  });