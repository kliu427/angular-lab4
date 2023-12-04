const express = require('express');
const app = express();
const port = 3000;
const router = express.Router();
const adminRouter = express.Router();
const mysql2 = require('mysql2');
const bcrypt = require('bcrypt');

const connection = mysql2.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'ChaosHockey71!',
  database: 'testDB'
}).promise(); 

async function login(email, pass) {
    
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
      return { success: true, message: 'Login successful!', user: user };
      } else {
      return { success: false, message: 'Invalid credentials' };
      }
    } catch (error) {
        console.error('Login error: ', error);
      return { success: false, message: 'Login failed' };
    }
}

// Create a connection to the database
const {addUser, removeUser, checkUser} = require('./database');

router.post('/create_user/:username/:password/:email', async(req, res) =>{
    const username = req.params.username;
    const password = req.params.password;
    const email = req.params.email;
    try {
      await addUser(username, password, email);
      res.status(201).send('New user account created!');
    } catch (error) {
      res.status(500).json({"error": error});
    }
});

router.get('/login/:email/:password', async(req, res) =>{
  const password = req.params.password;
  const email = req.params.email;
  try {
    await checkUser(email, password)
    const result = (await login(email, password)).message
    res.status(201).send(result);
  } catch (error) {
    res.status(500).json({"error": error});
  }
});

adminRouter.delete('/delete_user/:email', async(req, res) =>{
  const email = req.params.email;
  try {
    await removeUser(email);
    res.status(201).send('Account deleted!');
  } catch (error) {
    res.status(500).json({"error": error});
  }
});


app.use('/api/superheroes/admin', adminRouter);
app.use('/api/superheroes', router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});