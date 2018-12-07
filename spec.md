Specs:
- [x] Using Ruby on Rails for the project
- [x] Include at least one has_many relationship (User has_many Recipes) 
- [x] Include at least one belongs_to relationship (Recipe belongs_to User)
- [x] Include at least two has_many through relationships (Recipe has_many Ingredients through Quantities)
- [x] Include at least one many-to-many relationship (Recipe has_many Ingredients through Quantities, Ingredients has_many Recipes through Quantities)
- [x] The "through" part of the has_many through includes at least one user submittable attribute, that is to say, some attribute other than its foreign keys that can be submitted by the app's user (ingredients.name)
- [x] Include reasonable validations for simple model objects (list of model objects with validations e.g. User, Recipe, Ingredient, Quantity)
- [x] Include a class level ActiveRecord scope method (User.order_by_name, URL: /users/order_by_name)
- [x] Include signup (manually created with user model)
- [x] Include login (manually created with session controller)
- [x] Include logout (manually created with session controller)
- [x] Include third party signup/login (OmniAuth via Facebook)
- [x] Include nested resource show or index (URL e.g. users/2/recipes)
- [x] Include nested resource "new" form (URL e.g. recipes/1/ingredients/new)
- [x] Include form display of validation errors (form URL e.g. /recipes/new)

Confirm:
- [x] The application is pretty DRY
- [x] Limited logic in controllers
- [x] Views use helper methods if appropriate
- [ ] Views use partials if appropriate