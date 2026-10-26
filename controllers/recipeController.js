
const Recipe = require('../models/recipe')

//functions

//get all the recipes 
exports.getAllRecipes= async (req, res) =>{
    try {
    const recipes = await Recipe.find()
    res.render('index.ejs', { recipes })
    
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.createRecipe = async (req, res) =>{
    try{
        const data = { ...req.body }
        if (!data.image) {
            let r = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(data.title)}`)
            let json = await r.json()
            if (!json.meals) {
              r = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
              json = await r.json()
            }
            data.image = json.meals?.[0]?.strMealThumb || '/public/img/over-nightoats.jpg'
          }
        await Recipe.create(data)
        res.redirect('/')
    }catch (err){
        res.status(400).json({ error: err.message })
    }
}

//get one recipe
exports.getOneRecipe = async (req, res) => {
  try {
    const datos = await Recipe.findById(req.params.id)
    if (!datos) return res.status(404).json({ error: 'No encontrado' })
    res.json(datos)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.updateRecipe = async (req, res) => {
  try {
    const actualizado = await Recipe.findByIdAndUpdate(
      req.params.id, req.body, { returnDocument: 'after', runValidators: true }
    )
    if (!actualizado) return res.status(404).json({ error: 'No encontrado' })
    res.json(actualizado)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

  exports.deleteRecipe = async (req, res) => {
  try {
    const eliminado = await Recipe.findByIdAndDelete(req.params.id)
    if (!eliminado) return res.status(404).json({ error: 'No encontrado' })
    res.json({ mensaje: 'Eliminado' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}



