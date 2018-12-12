class IngredientsController < ApplicationController

  def show
    @ingredient = Ingredient.find_by(id: params[:id])
  end
end
