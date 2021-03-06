# frozen_string_literal: true

module Api
  class ChildClientsController < ActionController::API
    def show
      childclient = ChildClients::ChildClientRepository.new.show(params[:id], session[:token])
      render json: childclient
    end

    def csec
      child_client_repo = ChildClients::ChildClientRepository.new
      child_clients = child_client_repo.child_clients_by_csec(params[:id], session[:token])
      render json: child_clients
    end
  end
end
