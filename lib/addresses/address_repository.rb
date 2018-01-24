# frozen_string_literal: true

module Addresses
  class AddressRepository
    def initialize(http_service = Infrastructure::HttpService.new)
      @http_service = http_service
    end

    def show(id, token)
      response = @http_service.get("/addresses/#{id}", token)
      Address.new(response.body)
    end
  end
end
