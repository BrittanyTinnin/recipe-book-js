class ApplicationController < ActionController::Base
  helper_method :logged_in?, :current_user, :require_login
  
  private

  def current_user
    if session[:user_id]
      @current_user || User.find_by(id: session[:user_id])
    end
  end

  def logged_in?
    !current_user.nil?
  end

  def require_login
    unless logged_in?
      flash[:error] = "You must be logged in to access this section."
      redirect_to login_path
    end
  end
end
