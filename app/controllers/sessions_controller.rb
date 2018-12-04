class SessionsController < ApplicationController
  def new
  end

  def create
  end

  def destroy
    session.clear
    redirect_to login_path
  end
end
