const express = require('express')
const router = express.Router()
const controller = require('../controllers/recipeController');


//router.get('/', controller.getAllRecipes)
router.get('/:id', controller.getOneRecipe)
router.post('/', controller.createRecipe)
router.put('/:id', controller.updateRecipe)
router.delete('/:id', controller.deleteRecipe)


module.exports = router;