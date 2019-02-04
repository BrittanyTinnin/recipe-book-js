class RecipesController < ApplicationController
  before_action :require_login
  # skip_before_action :require_login, only: [:index]
  before_action :set_recipe, only: [:show, :edit, :update, :destroy]

  def index
    if params[:user_id]
      @user = current_user
      @recipes = @user.recipes
      respond_to do |format|
        format.html {render :index}
        format.json {render json: @recipes}
      end
    else
      @recipes = Recipe.all
      respond_to do |format|
        format.html {render :index}
        format.json {render json: @recipes}
      end
    end
  end

  def new
    @recipe = Recipe.new
    4.times{@recipe.quantities.build}
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
    if !@recipe
      flash[:notice] = "Recipe does not exist."
      redirect_to recipes_path
    end
    respond_to do |format|
      format.html {render :show}
      format.json {render json: @recipe}
    end
  end

  def edit
    @user = current_user
    if !@recipe
      flash[:notice] = "Recipe does not exist for this user."
      redirect_to recipes_path
    end
    add_quantity = 4 - @recipe.quantities.length
    add_quantity.times {@recipe.quantities.build}
  end

  def update
    @recipe.quantities.destroy_all
    if @recipe.update(recipe_params)
      redirect_to user_recipe_path(current_user.id, @recipe)
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
      quantities_attributes: [:name, :amount]
      )
  end
end
