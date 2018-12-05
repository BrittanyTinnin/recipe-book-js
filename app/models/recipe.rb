class Recipe < ApplicationRecord
  belongs_to :user
  has_many :quantities
  has_many :ingredients, through: :quantities

  validates :name, presence: true
  validates :description, presence: true
  validates :instructions, presence: true


  accepts_nested_attributes_for :quantities, reject_if: :all_blank

  def quantities_attributes=(quantities_attributes)
    # self.quantities.destroy_all
    quantities_attributes.values.each do |i, quantity_attributes|
      self.quantities.build(quantity_attributes)
    end
  end

end
