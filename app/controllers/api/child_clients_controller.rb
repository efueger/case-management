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

    def indian_ancestry_notifications
      client_indian_ancestry_repo = ChildClients::ChildClientRepository.new
      client_indian = client_indian_ancestry_repo.child_clients_by_indian_ancestry_notifications(params[:id], session[:token])
      render json: client_indian
    end
  end
end
