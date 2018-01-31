# frozen_string_literal: true

module Api
  class ChildClientsController < ActionController::API
    def show
      childclient = ChildClients::ChildClientRepository.new.show(params[:id], session[:token])
      render json: childclient
    end
  end
end
