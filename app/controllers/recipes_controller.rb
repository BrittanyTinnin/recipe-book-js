class RecipesController < ApplicationController
  before_action :require_login
  skip_before_action :require_login, only: [:index]

  def index
    @recipes = Recipe.all
  end

  def new
    @recipe = Recipe.new
    3.times {
      quantity = @recipe.quantities.build
      quantity.build_ingredient
    }
  end

  def create
    @recipe = Recipe.new(recipe_params)
    if @recipe.save!
      redirect_to user_recipe(current_user.id)
    else 
      render :new
    end
  end

  def edit
  end

  def update
  end

  def destroy
  end

  private

  def recipe_params
    params.require(:recipe).permit(:name, :description, :instructions, quantities_attributes: [:amount, ingredient_attributes: [:amount]])
  end
end
