class RecipesController < ApplicationController
  before_action :require_login
  skip_before_action :require_login, only: [:index]
  before_action :set_recipe, only: [:show, :edit]

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
    @recipe = current_user.recipes.new(recipe_params)
    if @recipe.save!
      redirect_to user_recipe_path(current_user.id, @recipe)
    else 
      render :new
    end
  end

  def show
  end

  def edit
    @user = current_user
  end

  def update
    @user = current_user
    @recipe = @user.recipes
    if @recipe.update(recipe_params)
      redirect_to user_recipe_path(current_user.id, @recipe)
    else
      render :edit
    end
  end

  def destroy
  end

  private

  def set_recipe
    @recipe = Recipe.find_by(id: params[:id])
  end

  def recipe_params
    params.require(:recipe).permit(
      :user_id, 
      :name, 
      :description, 
      :instructions, 
      quantities_attributes: [ :amount, 
      ingredient_attributes: [ :name]]
      )
  end
end
