const express = require('express');
const app = express();
const port = 3000;
const router = express.Router();
const adminRouter = express.Router();



// Create a connection to the database
const {addUser, removeUser} = require('./database.js');





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

adminRouter.delete('/delete_user/:email', async(req, res) =>{
  const email = req.params.email;
  try {
    await removeUser(email);
    res.status(201).send('Account deleted!');
  } catch (error) {
    res.status(500).json({"error": error});
  }
});


router.get('/', (req, res) => {
  res.send('Hello World!');
});


app.use('/api/superheroes/admin', adminRouter);
app.use('/api/superheroes', router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});