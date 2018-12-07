class Recipe < ApplicationRecord
  belongs_to :user
  has_many :quantities
  has_many :ingredients, through: :quantities

  validates :name, presence: true
  validates :description, presence: true
  validates :instructions, presence: true

  scope :order_by_name, -> {order(name: :asc)}
  scope :order_by_instructions, -> {order(instructions: :asc)}


  accepts_nested_attributes_for :quantities

  def quantities_attributes=(quantities_attributes)
    self.quantities.destroy_all
    quantities_attributes.values.each do |quantity_attributes|
      self.quantities.build(quantity_attributes)
    end
  end

end
