module RedisHelper
    extend ActiveSupport::Concern
  
    def store_item_in_redis(item)
      session[:item] = item
    end
  
    def get_item_from_session
      session[:item]
    end
  end