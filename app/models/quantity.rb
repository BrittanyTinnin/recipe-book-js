class Quantity < ApplicationRecord
  belongs_to :recipe
  belongs_to :ingredient, optional: true



  accepts_nested_attributes_for :ingredient, reject_if: :all_blank
end
