const express = require('express');
const app = express();
const port = 3000;

const mysql = require('mysql2');

// Create a connection to the database
const database = require('./database');






router.get('/', (req, res) => {
  res.send('Hello World!');
});


app.use('/api/superheroes', adminRouter)
app.use('/api/superheroes', router)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});