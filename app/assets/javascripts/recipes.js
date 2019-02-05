//set up a document ready in order to detect when our HTML page has loaded, and the document is ready to be manipulated:
$(document).ready(function() {
  // list all event listener functions
  console.log('recipe.js is loaded....');
  listenAllRecipesClick();
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
      recipeList += '<li>' + recipe.name + '</li>'
    })
    // console.log(recipes);
    
  });
};

function getAllSandwiches() {
  $.get("/sandwiches.json", function(data){
      let sandwiches = data
      // console.log(sandwiches)
      let emptystring = ""
      sandwiches.forEach((sandwich) => {
          emptystring += '<li>' + sandwich["sandwich_name"] + '</li>';
      });
      $("#get-sandwiches").html(emptystring)
  })
}


