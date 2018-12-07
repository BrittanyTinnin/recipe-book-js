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

