require 'json'
module AuthenticationProvider
  extend ActiveSupport::Concern

  def store_token_in_redis(token)
    session[:token] = token
  end

  def get_session_token
    session[:token]
  end

  def get_user_from_session
    User.new(JSON.parse(session[:user_details]))
=begin
    user_details = JSON.parse(session[:user_details])
    User.new(user_details['user'],
             user_details['staffId'],
             user_details['roles'],
             user_details['county_code'],
             user_details['county_name'],
             user_details['privilege'])
=end
  end
end
