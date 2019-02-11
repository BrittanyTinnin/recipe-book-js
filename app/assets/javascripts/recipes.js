//set up a document ready in order to detect when our HTML page has loaded, and the document is ready to be manipulated:
$(document).ready(function() {
  // list all event listener functions
  if (document.getElementById('ajax-content') ) {
    listenAllRecipesClick();
    listenMyRecipesClick();
    listenForNewRecipeClick();
  }
});


class Recipe {
  constructor(obj) {
    this.id = obj.id
    this.name = obj.name
    this.description = obj.description
    this.quantities = obj.quantities
    this.ingredients = obj.ingredients
  }
}


Recipe.prototype.buildHTML = function() {
  let html = '<h2>Recipe</h2>' + `<h3>${this.name}</h3>`
  html += `<p>${this.description}</p>` + '<ul>'
  for (i = 0; i < this.quantities.length; i++) {
    html += `<li>${this.quantities[i].amount} of ${this.ingredients[i].name}</li>`
  }
  html += '</ul>'
  return html
}


function listenAllRecipesClick() {
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
      recipeList += '<li>' + '<a class="recipe-name" href="recipes/' + recipe.id + '">' + recipe.name + '</a>' + '</li>';
    });
    $('#ajax-content').html('<br>' + '<h3> All Recipes </h3>' + recipeList);
    listenRecipeNameClick();
  });
};


function listenRecipeNameClick() {
  $(".recipe-name").click(function(e){
    e.preventDefault();
    const url = this.href
    showRecipe(url);
  })
}

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

function listenMyRecipesClick() {
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
      myRecipeList += '<li>' + '<a class="recipe-name" href="recipes/' + recipe.id + '">' + recipe.name + '</a>' + '</li>';
    })
    $('#ajax-content').html('<br>' + '<h3> My Recipes </h3>' + myRecipeList);
    listenRecipeNameClick();
  });
}

function listenForNewRecipeClick() {
  let newRecipeLink = document.getElementById("new-recipe")
  newRecipeLink.addEventListener('click', function(e){
    e.preventDefault();
    const url = this.attributes.href.textContent
    loadForm(url);
  })
}

function loadForm(url) {
  let param = "?layout=false"
 $.get(url + param).done(resp => {
   $('#ajax-content').html(resp);
   listenSubmitForm();
 })
}

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
  })
}

