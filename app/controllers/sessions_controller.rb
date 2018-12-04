class SessionsController < ApplicationController
  def new
  end

  def create
    if auth_hash = request.env["omniauth.auth"]
      @user = User.find_or_create_by_omniauth(auth_hash)
      session[:user_id] = @user.id
      redirect_to recipes_path
    else
      @user = User.find_by(email: params[:email])
      if @user && @user.authenticate(params[:password])
        session[:user_id] = params[:email] = @user.id
        flash[:notice] = "You're logged in."
        redirect_to recipes_path
      else 
        flash[:alert] = "Invalid username/password."
        render :new
      end
    end
  end

  def destroy
    session.clear
    flash[:notice] = "You have successfully logged out."
    redirect_to login_path
  end

  private
 
  def auth
    request.env['omniauth.auth']
  end

end
