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

  def quantities_attributes=(quantities_attributes)
    binding.pry
    quantities_attributes.values.each do |quantity_attributes|
      unless quantity_attributes[:name].blank?
        quantity = Quantity.new(quantity_attributes)
        self.quantities << quantity
      end
    end
  end

end

