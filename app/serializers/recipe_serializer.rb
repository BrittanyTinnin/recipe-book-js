class RecipeSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :instructions
  belongs_to :user
  has_many :quantities
  has_many :ingredients
end
