# frozen_string_literal: true

module Addresses
  class AddressRepository
    def initialize(http_service = Infrastructure::HttpService.new)
      @http_service = http_service
    end

    def addresses_by_client_id(id, token)
      response = @http_service.get("/child-clients/#{id}/addresses", token)
      return [] if response.status == 404
      response.body.map { |result| Address.new(result[:address]) }
    end
  end
end
