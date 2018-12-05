class RecipesController < ApplicationController

  def index
    @recipes = Recipe.all
  end

  def new
    @recipe = Recipe.new
    3.times {@recipe.ingredients.build}
  end

  def create
    @recipe = Recipe.new(recipe_params)
    raise params.inspect #params doesn't include ingredients
    
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
    params.require(:recipe).permit(:name, :description, :instructions, ingredients_attributes: [:name])
  end
end
