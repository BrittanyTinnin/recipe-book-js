class Quantity < ApplicationRecord
  belongs_to :recipe
  belongs_to :ingredient

  # def filling_name
  #   self.filling.filling_name if self.filling
  # end

  # def filling_name=(name)
  #   self.filling = Filling.find_or_create_by(filling_name: name)
  # end


  def name
    self.ingredient.name if self.ingredient
  end

  def name=(name)
    self.ingredient = Ingredient.find_or_create_by(name: name)
  end

end
