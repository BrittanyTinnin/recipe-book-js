class Recipe < ApplicationRecord
  belongs_to :user
  has_many :quantities
  has_many :ingredients, through: :quantities

  accepts_nested_attributes_for :quantities

  def quantities_attributes=(quantities_attributes)
    quantities_attributes.values.each do |i, quantity_attributes|
      self.quantities.build(quantity_attributes)
    end
  end

end
