# frozen_string_literal: true

module Api
  class ClientsController < ActionController::API
    def show
      clients = Clients::ClientRepository.new.show(params[:id], session[:token])
      render json: clients
    end

    def safety_alerts
      client_safety_alert_repo = Clients::ClientRepository.new
      client_safety_alerts = client_safety_alert_repo.safety_alerts(params[:id], session[:token])
      render json: client_safety_alerts
    end
  end
end
