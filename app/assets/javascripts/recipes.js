//set up a document ready in order to detect when our HTML page has loaded, and the document is ready to be manipulated:
$(document).ready(function() {
  // list all event listener functions
  console.log('recipe.js is loaded....');
  if(document.getElementById('ajax-content') ) {
    listenAllRecipesClick();
    listenMyRecipesClick();
  }
});

class Recipe {
  constructor(obj) {
    this.id = obj.id
    this.name = obj.name
    this.description = obj.description
    // this.user.id = obj.user.id
    this.quantities = obj.quantities
    this.ingredients = obj.ingredients
  }
}

Recipe.prototype.buildHTML = function() {
  let html = `<h2>${this.name}</h2>`
  html += `<li>${this.description}</li>`
  return html
}


function listenAllRecipesClick() {
  console.log('in listen all recipes click function');
  let docId = document.getElementById('all-recipes');
  docId.addEventListener('click', function(event){
    event.preventDefault();
    getRecipes();
  });
};


function getRecipes() {
  fetch('/recipes.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    let recipes = myJson
    let recipeList = ""
    recipes.forEach((recipe) => {
      recipeList += '<li>' + '<a class="recipe-name" href="#" data-id=' + recipe.id + '>' + recipe.name + '</a>' + '</li>';
    });
    $('#ajax-content').html('<br>' + '<h3> All Recipes </h3>' + recipeList);
  });
  listenRecipeNameClick();
};

function listenRecipeNameClick() {
  console.log('inside recipe name click')
  // let recipeName = document.getElementsByClassName('recipe-name');
  // console.log(recipeName)
  // recipeName.addEventListener('click', function(e){
  //   e.preventDefault();
  // })
  $('.recipe-name').click(function(e){
    e.preventDefault();
    console.log(this)
    showRecipe();
  })
}

function showRecipe() {
  console.log('in show recipe function')

}


function listenMyRecipesClick() {
  console.log('in my recipes click function')
  let myRecipeEl = document.getElementById('my-recipes');
  myRecipeEl.addEventListener('click', function(e){
    e.preventDefault();
    const url = this.href
    getMyRecipes(url);
  })
}

function getMyRecipes(url) {
  fetch(url + '.json')
  .then(function(response){
    return response.json()
  })
  .then(function(myJson) {
    let myRecipes = myJson
    let myRecipeList = ""
    myRecipes.forEach((recipe) => {
      myRecipeList += '<li>' + '<a href="#">' + recipe.name + '</a>' + '</li>';
    })
    $('#ajax-content').html('<br>' + '<h3> My Recipes </h3>' + myRecipeList);
  });
}
