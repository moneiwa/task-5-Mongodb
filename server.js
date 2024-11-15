// require ('dotenv').config()
// const express = require ('express')
// const app = express ()
// const mongoose = require ('mongoose')



// mongoose.connect('process.env.DATABASE_URL', {useNewurlParser: true})
// const db = mongoose.connection
// db.on('error', (error)=> console.error(error))

// db.once ('open', ()=> console.log ('Connected to Database '))


// app.use(express.json())




// app.listen (3000, ()=> console.log ('server Started on port 3000'))



const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const recipeRoutes = require('./routes/recipeRoutes');
dotenv.config();

const app = express();
app.use(bodyParser.json());


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected'))
  .catch((error) => console.log('error while connecting:', error));


app.use('/recipes', recipeRoutes);


app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

























