class RecipesController < ApplicationController
  before_action :require_login
  # skip_before_action :require_login, only: [:index]
  before_action :set_recipe, only: [:show, :edit, :update, :destroy]

  def index
    if params[:user_id]
      @user = current_user
      @recipes = @user.recipes
    else
      @recipes = Recipe.all
    end
  end

  def new
    @recipe = Recipe.new
    4.times {
      quantity = @recipe.quantities.build
      quantity.build_ingredient
    }
  end

  def create
    @recipe = current_user.recipes.new(recipe_params)
    if @recipe.save
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
    if @recipe.update(recipe_params)
      redirect_to recipe_path(@recipe)
    else
      render :edit
    end
  end

  def destroy
    @recipe.delete
    redirect_to recipes_path
  end

  def name
    @recipes = Recipe.order_by_name
  end

  def myname
    @user = current_user
    @recipes = @user.recipes.order_by_name
  end

  def updated
    @recipes = Recipe.recently_updated
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
