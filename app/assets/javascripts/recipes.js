//set up a document ready in order to detect when our HTML page has loaded, and the document is ready to be manipulated:
$(document).ready(function() {
  // list all event listener functions
  console.log('recipe.js is loaded....')
  listenAllRecipesClick()
});

function listenAllRecipesClick() {
  console.log('in listen all recipes click function')
  let asdf = document.getElementById('all-recipes')
  asdf.addEventListener('click', function(event){
    event.preventDefault();
    console.log(event)
    getRecipes();
  })
}

function getRecipes() {
  
}

