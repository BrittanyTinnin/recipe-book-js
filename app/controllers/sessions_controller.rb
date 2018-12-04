class SessionsController < ApplicationController
  def new
  end

  def create
    @user = User.find_by(username: params[:username])
    if @user && @user.authenticate(params[:password])
      session[:user_id] = params[:username] = @user.id
      flash[:notice] = "You're logged in."
      redirect_to recipes_path
    else 
      flash[:alert] = "Invalid username/password."
      render :new
    end
  end

  def destroy
    session.clear
    flash[:notice] = "You have successfully logged out."
    redirect_to login_path
  end

  private

  def session_params
    params.require(:user).permit(:email, :password)
  end

end
