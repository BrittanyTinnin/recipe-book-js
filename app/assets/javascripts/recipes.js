//set up a document ready in order to detect when our HTML page has loaded, and the document is ready to be manipulated:
$(document).ready(function() {
  // list all event listener functions
  if (document.getElementById('ajax-content') ) {
    listenAllRecipesClick();
    listenMyRecipesClick();
    listenForNewRecipeClick();
    loadSearchBar();
  }
});

//Recipe object
class Recipe {
  constructor(obj) {
    this.id = obj.id
    this.name = obj.name
    this.description = obj.description
    this.quantities = obj.quantities
    this.ingredients = obj.ingredients
    this.instructions = obj.instructions
  }
}

//Recipe prototype method -- recipe display
Recipe.prototype.buildHTML = function() {
  let html = '<h3>Recipe Info</h3>' + `<h4>Name: ${this.name}</h4>`
  html += `<p> Description: ${this.description}</p>` + `<p>Instructions: ${this.instructions}</p>` + '<h4>Ingredients</h4>' + '<ul>'
  for (i = 0; i < this.quantities.length; i++) {
    html += `<li>${this.quantities[i].amount} of ${this.ingredients[i].name}</li>`
  }
  html += '</ul>'
  return html
}

//when user clicks on 'All Recipes'
function listenAllRecipesClick() {
  let docId = document.getElementById('all-recipes');
  docId.addEventListener('click', function(event){
    event.preventDefault();
    getRecipes();
  });
};

//loads all recipes after clicking 'All Recipes'
function getRecipes() {
  fetch('/recipes.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    let recipes = myJson
    let recipeList = `<form action="/" method="post" id="search-form">
    Search: <input type="text" name="recipe_name">
    <input type="submit" value="submit">
    </form>`
    recipes.forEach((recipe) => {
      recipeList += '<li>' + '<a class="recipe-name" href="recipes/' + recipe.id + '">' + recipe.name + '</a>' + '</li>';
    });
    $('#ajax-content').html('<br>' + '<h3> All Recipes </h3>' + recipeList);
    let search_form = document.getElementById("search-form")
    search_form.addEventListener('submit', function(e) {
      e.preventDefault();
      let searchResults = this.recipe_name.value
      let filtered = recipes.filter((recipe) => recipe.name.toLowerCase().includes(searchResults.toLowerCase()))
      recipeList = ""
      filtered.forEach((recipe) => {
        recipeList += '<li>' + '<a href="#">' + recipe.name + '</a>' + '</li>';
      })
      $('#ajax-content').html('<br>' + '<h3> All Recipes </h3>' + recipeList)
    })
    listenRecipeNameClick();
  });
};

//when user clicks recipe name
function listenRecipeNameClick() {
  $(".recipe-name").click(function(e){
    e.preventDefault();
    const url = this.href
    showRecipe(url);
  })
}

//loads recipe after clicking it's name
function showRecipe(url) {
  fetch(url + '.json')
  .then(function(response){
    return response.json()
  })
  .then(function(response){
    let recipe = new Recipe(response)
    $("#ajax-content").html(recipe.buildHTML())
  })
}

//when user clicks 'MyRecipes'
function listenMyRecipesClick() {
  let myRecipeEl = document.getElementById('my-recipes');
  myRecipeEl.addEventListener('click', function(e){
    e.preventDefault();
    const url = this.href
    getMyRecipes(url);
  })
}

//loads 'My Recipes'
function getMyRecipes(url) {
  fetch(url + '.json')
  .then(function(response){
    return response.json()
  })
  .then(function(myJson) {
    let myRecipes = myJson
    let myRecipeList = ""
    myRecipes.forEach((recipe) => {
      myRecipeList += '<li>' + '<a class="recipe-name" href="recipes/' + recipe.id + '">' + recipe.name + '</a>' + '</li>';
    })
    $('#ajax-content').html('<br>' + '<h3> My Recipes </h3>' + myRecipeList);
    listenRecipeNameClick();
  });
}

//when user clicks 'New Recipe'
function listenForNewRecipeClick() {
  let newRecipeLink = document.getElementById("new-recipe")
  newRecipeLink.addEventListener('click', function(e){
    e.preventDefault();
    const url = this.attributes.href.textContent
    loadForm(url);
  })
}

//loads 'New Recipe' form
function loadForm(url) {
  let param = "?layout=false"
 $.get(url + param).done(resp => {
   $('#ajax-content').html(resp);
   listenSubmitForm();
 })
}

//submits recipe form
function listenSubmitForm() {
  let submit = document.getElementById('submit-form')
  submit.addEventListener('click', function(e){
    e.preventDefault();

    let values = $('#new_recipe').serialize();

    let posting = $.post('/recipes', values);

    posting.done(function(data) {
      const newRecipe = new Recipe(data)
      $("#ajax-content").html(newRecipe.buildHTML())
    })
    .fail(function() {
      alert("Fields cannot be blank!")
    })
  })
}

function loadSearchBar() {
  console.log('search bar function loaded')
}

