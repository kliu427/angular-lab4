const mysql2 = require('mysql2');
const bcrypt = require('bcrypt');


const connection = mysql2.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'ChaosHockey71!',
    database: 'testDB'
  }).promise(); 

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
  
  async function checkUser(email, pass) {
    
    try {
        // Query the database to retrieve the user's hashed password based on the provided email
        const rows = await connection.query('SELECT password FROM users WHERE email = ?', [email]);
        
        if (rows == null) {
        // User not found
        return { success: false, message: 'Invalid credentials' };
        }

        const hPassString = rows[0][0].password;
        
        // Compare the provided password with the stored hashed password
        const passwordMatch = await bcrypt.compare(pass, hPassString);
        
        if (passwordMatch) {
        // If the password matches, you can fetch the user data or create 'user' object here
        const user = { email: email /* Add other user data here if needed */ };
        return { success: true, message: 'Login successful', user: user };
        } else {
        return { success: false, message: 'Invalid credentials' };
        }
      } catch (error) {
          console.error('Login error: ', error);
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

  async function addList(listName, description) {
    try {
      await connection.query(
        'INSERT INTO `testdb`.lists (list_name, description) VALUES (?, ?)',
        [listName, description]
      );

    } catch (error) {
      console.log(error);
      throw new Error("Can't Add List");
    }
  }

  async function getList(listName) {
    try {
      const value = await connection.query(
        'SELECT * FROM `testdb`.l ist_heroes WHERE list_name = ?',
        [listName]
      );
      const heroInfo = [];
      heroInfo.push(listName);
      for (info of value[0]){
        heroInfo.push(info['hero_info'])
      }
      return heroInfo;
    } catch (error) {
      console.log(error);
      throw new Error("Can't find list");
    }
  }

    module.exports = {
      addUser, 
      removeUser, 
      checkUser,
      addList,
      getList
    };