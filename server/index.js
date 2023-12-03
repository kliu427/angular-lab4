const express = require('express');
const app = express();
const port = 3000;

router.get('/', (req, res) => {
  res.send('Hello World!');
});


app.use('/api/superheroes', adminRouter)
app.use('/api/superheroes', router)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});