create action
quantities_attributes
=> {"0"=>{"amount"=>"2 tbs", "ingredient_attributes"=>{"name"=>"peanut butter"}},
 "1"=>{"amount"=>"2 tbs", "ingredient_attributes"=>{"name"=>"jelly"}},
 "2"=>{"amount"=>"2 slices", "ingredient_attributes"=>{"name"=>"bread"}}}

 edit action
 quantities_attributes
=> {"0"=>{"amount"=>"2 tbs", "ingredient_attributes"=>{"name"=>"peanut butter"}},
 "1"=>{"amount"=>"2 tbs", "ingredient_attributes"=>{"name"=>"jelly"}},
 "2"=>{"amount"=>"", "ingredient_attributes"=>{"name"=>""}}}

 <!DOCTYPE html>
<html>
  <head>
    <title>RecipeBook</title>
    <%= csrf_meta_tags %>
    <%= csp_meta_tag %>

    <%= stylesheet_link_tag    'application', media: 'all', 'data-turbolinks-track': 'reload' %>
    <%= javascript_include_tag 'application', 'data-turbolinks-track': 'reload' %>
  </head>

  <body>
    <%= render 'shared/nav'%>
    <div class="container">
    <% if logged_in? %>
      <%= link_to "Logout", logout_path %>
      <%= link_to "All Recipes", recipes_path %>
      <%= link_to "New Recipe", new_user_recipe_path(current_user.id) %>
      <%= link_to "My Recipes", user_recipes_path(current_user.id) %><br>
    <% else %>
      <%= link_to "Signup", signup_path %>
      <%= link_to "Login", login_path %><br>
    <% end %>
    <% flash.each do |name, msg| %>
      <%= content_tag :div, msg, class: name %>
    <% end %>

      <%= yield %>
    </div>

  </body>
</html>


 rails c
Running via Spring preloader in process 2858
/home/britt/.rvm/gems/ruby-2.3.3/gems/spring-2.0.2/lib/spring/application.rb:185: warning: Insecure world writable dir /home/britt/.rvm/gems/ruby-2.3.3/bin in PATH, mode 040777
Loading development environment (Rails 5.2.1.1)
2.3.3 :001 > recipe = Recipe.find_by(name: "a")
  Recipe Load (1.1ms)  SELECT  "recipes".* FROM "recipes" WHERE "recipes"."name" = ? LIMIT ?  [["name", "a"], ["LIMIT", 1]]
 => #<Recipe id: 40, name: "a", description: "a", instructions: "a", user_id: 2, created_at: "2018-12-07 14:27:54", updated_at: "2018-12-07 14:27:54">
2.3.3 :002 > ing = Ingredient.find_or_create_by(name: "mayo")
  Ingredient Load (0.9ms)  SELECT  "ingredients".* FROM "ingredients" WHERE "ingredients"."name" = ? LIMIT ?  [["name", "mayo"], ["LIMIT", 1]]
 => #<Ingredient id: 86, name: "mayo", created_at: "2018-12-06 04:08:29", updated_at: "2018-12-06 04:08:29">
2.3.3 :003 > recipe.quantities.build(amount: 3, ingredient: ing)
 => #<Quantity id: nil, recipe_id: 40, ingredient_id: 86, amount: "3", created_at: nil, updated_at: nil>
2.3.3 :004 > recipe.save
   (0.3ms)  begin transaction
  User Load (0.5ms)  SELECT  "users".* FROM "users" WHERE "users"."id" = ? LIMIT ?  [["id", 2], ["LIMIT", 1]]
  Quantity Create (5.0ms)  INSERT INTO "quantities" ("recipe_id", "ingredient_id", "amount", "created_at", "updated_at") VALUES (?, ?, ?, ?, ?)  [["recipe_id", 40], ["ingredient_id", 86], ["amount", "3"], ["created_at", "2018-12-07 18:07:00.173347"], ["updated_at", "2018-12-07 18:07:00.173347"]]
   (51.5ms)  commit transaction
 => true
2.3.3 :005 > recipe
 => #<Recipe id: 40, name: "a", description: "a", instructions: "a", user_id: 2, created_at: "2018-12-07 14:27:54", updated_at: "2018-12-07 14:27:54">
2.3.3 :006 > recipe.ingredients
  Ingredient Load (1.0ms)  SELECT  "ingredients".* FROM "ingredients" INNER JOIN "quantities" ON "ingredients"."id" = "quantities"."ingredient_id" WHERE "quantities"."recipe_id" = ? LIMIT ?  [["recipe_id", 40], ["LIMIT", 11]]
 => #<ActiveRecord::Associations::CollectionProxy [#<Ingredient id: 338, name: "a", created_at: "2018-12-07 14:27:54", updated_at: "2018-12-07 14:27:54">, #<Ingredient id: 339, name: "", created_at: "2018-12-07 14:27:54", updated_at: "2018-12-07 14:27:54">, #<Ingredient id: 340, name: "", created_at: "2018-12-07 14:27:54", updated_at: "2018-12-07 14:27:54">, #<Ingredient id: 341, name: "", created_at: "2018-12-07 14:27:55", updated_at: "2018-12-07 14:27:55">, #<Ingredient id: 86, name: "mayo", created_at: "2018-12-06 04:08:29", updated_at: "2018-12-06 04:08:29">]>
