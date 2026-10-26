const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
    
    title:{
        type: String,
        required:true
    },
    description: {
        type: String
    },
    category: {
        type: String,
        required: true,
        enum:[
            'Breakfast', 'Snack','Lunch','Dinner','Dessert', 'Drink'
        ],
    },
    servings: {
        type:Number,
        required: true,
        min : [1, 'servings cannot be negative or 0'], default: 1
    },
    preptime: {
        type:Number,
        required: true,
        min : [0, 'preptime cannot be negative or 0'], default: 0
    },
    cooktime: {
        type:Number,
        required: true,
        min : [0, 'cooktime cannot be negative or 0'], default: 0
    },
    difficulty: {
        type: String,
        required: true,
        enum:[
            'Easy', 'Medium','Hard'
        ], default: 'Easy'
    },/*
    ingredients: [{
        name:           { 
            type: String, 
            required: true 
        },
        externalId:     { 
            type: String 
        },                   // id API
        quantity:       { 
            type: Number, 
            required: true, min: 0 
        },   // lo que escribió el usuario
        unit:           { 
            type: String, 
            required: true 
        },           // g, cup, tbsp etc etc API
        grams:          { 
            type: Number, 
            min: 0 
        },                  
        kcalPer100g:    { 
            type: Number, min: 0 
        },                   // API
        calories:       { 
            type: Number, min: 0 
        }                    // calculaaar
    }],*/
    instructions: {
        type: String
    },
    image :{
        type: String,
        default: '/img/21savage.jpg'
    },
}, { timestamps : true })

//hace la suma del key preptime y cook time
recipeSchema.virtual('totalTime').get(function () {
    return this.preptime + this.cooktime
})

recipeSchema.set('toJSON', { virtuals: true })
//model
module.exports = mongoose.model('Recipe', recipeSchema, 'recipe');
