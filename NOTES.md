new is for a new instance of a specific model:

foo = Foo.new
build is for creating a new instance within an AR association:

bar = foo.build_bar  # (has_one or belongs_to)
or

bar = foo.bars.build # (has\_many, habtm or has_many :through)

function loadForm(url) {
  let param = "?layout=false"
 $.get(url + param).done(resp => {
   $('#ajax-form-recipe').html(resp);
   listenSubmitForm();
 })
}

function listenSubmitForm() {
  let submit = document.getElementById('submit-form')
  submit.addEventListener('click', function(e){
    e.preventDefault();
    console.log(e)

    let values = $('#new_recipe').serialize();

    let posting = $.post('/recipes', values);

    posting.done(function(data) {
      const newRecipe = new Recipe(data)
      $("#ajax-content").html(newRecipe.buildHTML())
      $("#ajax-form-recipe").remove()
    })
  })
}
