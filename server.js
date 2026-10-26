
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
app.use('/recipes', require('./routes/recipeRoutes'))

mongoose.connect(recipeBuilderdb)
  .then(() => {
    console.log('Connected to recipebuilderdb')
    app.listen(port, () => console.log(`Server on port ${port}`))
  })
  .catch(err => console.error('Connection error:', err.message))
/*

app.post('/messages', (req, res) => {
  db.collection('messages').insertOne(
    {name: req.body.name, 
      msg: req.body.msg, 
      thumbUp: 0, 
      thumbDown:0}, 
    (err, result) => {
    if (err) return console.log(err)
    console.log('saved to databasehh')
    res.redirect('/')
    console.log(result)
  })
})
//updating the likes
app.put('/messages', (req, res) => {
  db.collection('messages')
  .findOneAndUpdate(
    {name: req.body.name, msg: req.body.msg}, 
    {$set: {
      thumbUp:req.body.thumbUp + 1
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
      console.log(result)
    res.send(result)
  })
})
//updating the dislikes
app.put('/manitoAbajo', (req, res) => {
  db.collection('messages')
  .findOneAndUpdate(
    {name: req.body.name, msg: req.body.msg}, 
    {$set: { 
      thumbDown:req.body.thumbDown - 1
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
      console.log(result)
    res.send(result)
  })
})
app.delete('/messages', (req, res) => {
  db.collection('messages').findOneAndDelete({name: req.body.name, msg: req.body.msg}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})*/