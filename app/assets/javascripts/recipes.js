//set up a document ready in order to detect when our HTML page has loaded, and the document is ready to be manipulated:
$(document).ready(function() {
  // list all event listener functions
  console.log('recipe.js is loaded....');
  listenAllRecipesClick();
  listenMyRecipesClick();
});


function listenAllRecipesClick() {
  console.log('in listen all recipes click function');
  let asdf = document.getElementById('all-recipes');
  asdf.addEventListener('click', function(event){
    event.preventDefault();
    console.log(event);
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
      recipeList += '<li>' + '<a href="#">' + recipe.name + '</a>' + '</li>';
    });
    $('#recipe-list').html('<br>' + '<h3> All Recipes </h3>' + recipeList)
    // console.log(recipes);
  });
};


function listenMyRecipesClick() {
  console.log('in my recipes click function')
  let myRecipeEl = document.getElementById('my-recipes');
  myRecipeEl.addEventListener('click', function(e){
    e.preventDefault();
    getMyRecipes();
  })
}

function getMyRecipes() {
  console.log('in getMyRecipes click function')
  
}

function getRecipes() {
  fetch('/recipes.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    let recipes = myJson
    let recipeList = ""
    recipes.forEach((recipe) => {
      recipeList += '<li>' + '<a href="#">' + recipe.name + '</a>' + '</li>';
    });
    $('#recipe-list').html('<br>' + '<h3> All Recipes </h3>' + recipeList)
    // console.log(recipes);
  });
};