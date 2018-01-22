# frozen_string_literal: true

module Api
  class ClientsController < ActionController::API
    def show
      client = Clients::ClientRepository.new.show(params[:id], session[:token])
      render json: client
    end
  end
end
