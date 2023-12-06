const express = require('express');
const app = express();
const fs = require('fs'); 
const cors = require('cors');
app.use(cors());
const port = 3000;
const router = express.Router();
const adminRouter = express.Router();
const mysql2 = require('mysql2');
const bcrypt = require('bcrypt');
var stringSimilarity = require("string-similarity");


const superheroInfo = JSON.parse(fs.readFileSync('server/superhero_info.json', 'utf8'));
const superheroPowers = JSON.parse(fs.readFileSync('server/superhero_powers.json', 'utf8'));

const connection = mysql2.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'ChaosHockey71!',
  database: 'testDB'
}).promise(); 

router.get('/search/:name/:race/:power/:publisher', (req, res) =>{
  const heros = match(req.params.name, req.params.race, req.params.power, req.params.publisher);
  
  res.json(heros);

});

//function to search by parameters
function match(name, race, powers, publisher) {
  const matchingNames = [];
  const matchingRaces = [];
  const matchingPowers = [];
  const matchingPublishers = [];
  const matchingResults = [];
  const nameField = name.toLowerCase();
  const raceField = race.toLowerCase();
  const powersField = powers.toLowerCase();
  let formattedQueryField = powersField.charAt(0).toUpperCase() + powersField.slice(1);
  const publishersField = publisher.toLowerCase();

  for (heros of superheroInfo){

    if (stringSimilarity.compareTwoStrings(heros["name"], nameField)>0.2){
      matchingNames.push({name: heros['name'] , publisher: heros['Publisher']});
    }
  }
  for (heros of superheroInfo){
    if (stringSimilarity.compareTwoStrings(heros["Race"], raceField)>0.2){
        matchingRaces.push({name: heros['name'] , publisher: heros['Publisher']});
    }
  }

  for (heros of superheroInfo){
    if (stringSimilarity.compareTwoStrings(heros["Publisher"], publishersField)>0.2){
        matchingPublishers.push({name: heros['name'] , publisher: heros['Publisher']});
    }
  }


  for (powers of superheroPowers){
      if (powers[formattedQueryField] == "True"){
        const name = powers['hero_names']
        for (heros of superheroInfo){
          if (name == heros["name"]){
              matchingPowers.push({name: powers['hero_names'] , publisher: heros['Publisher']});
          }
        }
      }
  }

  for (name of matchingNames){
    const heroname = name.name;
    if(matchingPowers.some(hero => hero.name === heroname) && matchingRaces.some(hero => hero.name === heroname && matchingPublishers.some(hero => hero.name === heroname))) {
      matchingResults.push(name);
    }
  }
  return matchingResults;
}


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
const {addUser, removeUser, checkUser, addList, getList, deleteList, addHeroToList} = require('./database');

router.post('/add_hero/:list_name/:hero_name', async (req, res) =>{
  const listName = req.params.list_name;
  const heroName = req.params.hero_name;
  for (hero of superheroInfo){
    if (hero["name"] == heroName){
      
    }
  }
  try {
    const list = (await addHeroToList(listName, listDescription, listOwner));
    res.status(201).send(list);
    console.log(list)
  }catch (error) {
    res.status(500).json({"error": error});
  }
});

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

router.get('/get_list/:list_name', async (req, res) =>{
  const listName = req.params.list_name;
  try {
    const list = (await getList(listName));
    res.status(201).send(list);
    console.log(list)
  }catch (error) {
    res.status(500).json({"error": error});
  }
});

router.post('/add_list/:list_name/:description/:owner', async (req, res) =>{
  const listName = req.params.list_name;
  const listDescription = req.params.description;
  const listOwner = req.params.owner;

  try {
    const list = (await addList(listName, listDescription, listOwner));
    res.status(201).send(list);
    console.log(list)
  }catch (error) {
    res.status(500).json({"error": error});
  }
});

router.delete('/delete_list/:name', async(req, res) =>{
  const listName = req.params.name;
  try {
    await deleteList(listName);
    res.status(201).send('List deleted!');
  } catch (error) {
    res.status(500).json({"error": error});
  }
});

app.use('/api/superheroes/admin', adminRouter);
app.use('/api/superheroes', router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});