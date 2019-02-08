//set up a document ready in order to detect when our HTML page has loaded, and the document is ready to be manipulated:
$(document).ready(function() {
  // list all event listener functions
  console.log('recipe.js is loaded....');
  if(document.getElementById('ajax-content') ) {
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
    // this.user.id = obj.user.id
    this.quantities = obj.quantities
    this.ingredients = obj.ingredients
  }

  static newRecipeForm() {

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
      recipeList += '<li>' + '<a class="recipe-name" href="recipes/' + recipe.id + '">' + recipe.name + '</a>' + '</li>';
    });
    $('#ajax-content').html('<br>' + '<h3> All Recipes </h3>' + recipeList);
    listenRecipeNameClick();
  });
};

function listenRecipeNameClick() {
  console.log('inside recipe name click')
  $(".recipe-name").click(function(e){
    e.preventDefault();
    const url = this.href
    showRecipe(url);
  })
}

function showRecipe(url) {
  console.log('in show recipe function')
  fetch(url + '.json')
  .then(function(response){
    return response.json()
  })
  .then(function(response){
    let recipe = new Recipe(response)
    console.log('recipe created')
    console.log(recipe)
    $("#ajax-content").html(recipe.buildHTML())
  })
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
      myRecipeList += '<li>' + '<a class="recipe-name" href="recipes/' + recipe.id + '">' + recipe.name + '</a>' + '</li>';
    })
    $('#ajax-content').html('<br>' + '<h3> My Recipes </h3>' + myRecipeList);
    listenRecipeNameClick();
  });
}

function listenForNewRecipeClick() {
  console.log('in recipe form click function')
  let newRecipeLink = document.getElementById("new-recipe")
  newRecipeLink.addEventListener('click', function(e){
    e.preventDefault();
    const url = this.attributes.href.textContent
    console.log(url)
    loadForm(url);
  })
}

function loadForm(url) {
  console.log('inside getForm')
  let param = "?layout=false"
 $.get(url + param).done(resp => {
   $('#ajax-form-recipe').html(resp);
   listenSubmitForm();
 })
}

function listenSubmitForm() {
  console.log('in submit form')
  let submit = document.getElementById('submit-form')
  submit.addEventListener('click', function(e){
    e.preventDefault();

    let values = $('#new_recipe').serialize();

    let posting = $.post('/recipes', values);

    posting.done(function(data) {
      let recipe = data;
      $("#ajax-content").html(recipe.name)
      $("#ajax-form-recipe").remove()
    })
  })
}


// $(this).parents('form').remove();

// {/* <script type="text/javascript" charset="utf-8">
//   $(function () {
//     $('form').submit(function(event) {
//       //prevent form from submitting the default way
//       event.preventDefault();
 
//       var values = $(this).serialize();
 
//       var posting = $.post('/posts', values);
 
//       posting.done(function(data) {
//         var post = data;
//         $("#postTitle").text(post["title"]);
//         $("#postBody").text(post["description"]);
//       });
//     });
//   });
// </script> */}