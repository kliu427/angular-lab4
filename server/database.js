const mysql = require('mysql');
const bcrypt = require('bcrypt');




const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'ChaosHockey71!',
    database: 'testDB'
  }); 

  async function hashPassword(password) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      return hashedPassword;
    } catch (error) {
      console.error('Error hashing password:', error);
      throw new Error('Password hashing failed');
    }
  }
  
  checkUser("kliu71@outlook.com", 'admin1');
  async function checkUser(email, pass) {
    try {
        // Query the database to retrieve the user's hashed password based on the provided email
        const hPass = connection.query('SELECT password FROM users WHERE email = ?', [email]);
        
        if (hPass == null) {
          // User not found
          return { success: false, message: 'Invalid credentials' };
        }
        hPassString = hPass[0];
    
        // Compare the provided password with the stored hashed password
        const passwordMatch = await bcrypt.compare(pass, hPassString);
        console.log(passwordMatch);
        if (passwordMatch) {
          return { success: true, message: 'Login successful', user: user };
        } else {
          return { success: false, message: 'Invalid credentials' };
        }
      } catch (error) {
        console.error('Login error:', error);
        return { success: false, message: 'Login failed' };
      }
  }

  async function removeUser(email) {
    try {
      connection.query(
        'DELETE FROM users WHERE email = (?);',
        [email]
      );
    } catch (error) {
      throw new Error("Can't Add User");
    }
  }

  async function addUser(username, password, email) {
    const hashedPassword = await hashPassword(password);
    try {
      connection.query(
        'INSERT INTO users (username, password, email) VALUES (?, ?, ?)',
        [username, hashedPassword, email]
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

  module.exports = {addUser, removeUser};