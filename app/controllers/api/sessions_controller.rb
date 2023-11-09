class Api::SessionsController < ApplicationController
  before_action :require_logged_in, only:[:destroy]
  before_action :require_logged_out, only:[:create]
  def show
    
    if (logged_in?)
      @user = current_user
      render 'api/users/show'
    else 
      render json: {user: nil}
    end
  end

  def create
    username = params[:username]
    password = params[:password]
    @user = User.find_by_credentials(username, password)

    if @user 
      login!(@user)
      render 'api/users/show'
    else 
      render json: {errors: ['Invalid credentials']}, status: :unauthorized
    end 
  end

  def destroy
    logout!
    render json: {message: "success"}
  end
end
