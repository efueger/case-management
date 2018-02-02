# frozen_string_literal: true

module Api
  class PlacementsController < ActionController::API
    def clients_by_related_client_id
      address_map_service = Placements::AddressMapService.new
      placements = address_map_service.get_addresses(params[:client_id], session[:token])
      render json: placements
    end
  end
end
