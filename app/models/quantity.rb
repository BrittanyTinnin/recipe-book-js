class Quantity < ApplicationRecord
  belongs_to :recipe
  belongs_to :ingredient


  def name
    self.ingredient.name if self.ingredient
  end

  def name=(name)
    self.ingredient = Ingredient.find_or_create_by(name: name)
  end

end
