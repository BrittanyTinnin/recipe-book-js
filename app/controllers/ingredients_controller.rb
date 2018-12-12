class IngredientsController < ApplicationController
  def index
  end

  def show
    @ingredient = Ingredient.find_by(id: params[:id])
  end
end
