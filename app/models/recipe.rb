class Recipe < ApplicationRecord
  belongs_to :user
  has_many :quantities
  has_many :ingredients, through: :quantities

  validates :name, presence: true
  validates :description, presence: true
  validates :instructions, presence: true

  # scope :order_by_name, -> {order('lower(name) ASC')}
  def self.order_by_name
    order('lower(name) ASC')
  end

  accepts_nested_attributes_for :quantities

  def quantities_attributes=(quantities_attributes)
    # raise quantities_attributes.inspect
    self.quantities.destroy_all
    quantities_attributes.values.each do |quantity_attributes|
      if quantity_attributes[:ingredient_attributes][:name] != ""
        ingredient = Ingredient.find_or_create_by(name: quantity_attributes[:ingredient_attributes][:name])
        self.quantities.build(ingredient: ingredient, amount: quantity_attributes[:amount])
        self.save
      end
    end
  end

  # def quantities_attributes=(quantities_attributes)
  #   self.quantities.destroy_all
  #   quantities_attributes.values.each do |quantity_attributes|
  #     self.quantities.build(quantity_attributes)
  #   end
  # end

end

