# frozen_string_literal: true

module Api
  class AddressesController < ActionController::API
    def address_by_client
      address = Addresses::AddressRepository.new.show(params[:client_id], session[:token])
      render json: address
    end
  end
end
