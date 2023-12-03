const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'ChaosHockey71!',
    database: 'testDB' // Replace 'your_database_name' with the actual database name
  }); 




  async function removeUser(email) {
    try {
      await connection.query(
        'DELETE FROM users WHERE email = (?)',
        [email]
      );
    } catch (error) {
      console.log(error);
      throw new Error("Can't Add User");
    }
  }

  removeUser("test@gmail.com");
  async function addUser(username, password, email) {
    try {
      await connection.query(
        'INSERT INTO users (username, password, email) VALUES (?, ?, ?)',
        [username, password, email]
      );
    } catch (error) {
      console.log(error);
      throw new Error("Can't Add User");
    }
  }

  async function addList(listName, username, ids, rating, description, creationDate) {
    try {
      await connection.query(
        'INSERT INTO lists (listname, username, ids, average_rating, description, visibility_flag, creationDate) VALUES (?, ?, JSON_ARRAY(?), ?, ?, ?, ?)',
        [listName, username, JSON.stringify(ids), rating, description, false, creationDate]
      );
    } catch (error) {
      console.log(error);
      throw new Error("Can't Add List");
    }
  }