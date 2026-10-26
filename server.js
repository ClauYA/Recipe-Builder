require('./Routes/recipeRoutes')
require('dotenv').config();
const express = require('express')
const port     = process.env.PORT || 3000;
const app = express()       
const mongoose = require('mongoose');
const recipeController = require('./controllers/recipeController')

const recipeBuilderdb = `mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@${process.env.SERVER_DB}/recipebuilderdb`;

//const url = "mongodb+srv://demo:demo@cluster0-q2ojb.mongodb.net/test?retryWrites=true";
//const dbName = "";
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//go in the public folder and takes anytime that is in that folder
app.use(express.static('public'))
app.set('view engine', 'ejs');


app.get('/', recipeController.getAllRecipes)
app.use('/recipes', require('./Routes/recipeRoutes'))

mongoose.connect(recipeBuilderdb)
  .then(() => {
    console.log('Connected to recipebuilderdb')
    app.listen(port, () => console.log(`Server on port ${port}`))
  })
  .catch(err => console.error('Connection error:', err.message))
