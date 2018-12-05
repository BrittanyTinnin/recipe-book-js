class Recipe < ApplicationRecord
  belongs_to :user
  has_many :quantities
  has_many :ingredients, through: :quantities

  accepts_nested_attributes_for :ingredients

  # def ingredients_attributes=(ingredients_attributes)
  #   ingredients_attributes.values.each do |i, ingredient_attributes|
  #     self.ingredients.build(ingredient_attributes)
  #   end
  # end

end
