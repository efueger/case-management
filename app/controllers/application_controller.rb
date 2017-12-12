# frozen_string_literal: true

class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  include AuthenticationProvider
  include RedisHelper
  before_action :authenticate_with_cwds # , unless: 'Rails.env.development?'
  
  protected
  def authenticate_with_cwds
    session.delete(:token) if params[:token].present?
    if session[:token].blank?
      if Cwds::Authentication.token_validation(params[:token], AUTHENTICATION_API_BASE_URL)
        store_token_in_redis(params[:token])
        session[:user_details] = Cwds::Authentication.store_user_details_from_token(params[:token])
      else
        redirect_to Cwds::Authentication.authentication_url(AUTHENTICATION_API_BASE_URL, request.url)
      end
    end
    session[:user_details] = Cwds::Authentication.store_user_details_from_token(params[:token]) if session[:user_details].blank?
    @user = get_user_from_session if session[:user_details].present?
  end
end
