# frozen_string_literal: true

module Addresses
  class GeoRepository
    def initialize(http_service = new_http_service)
      @http_service = http_service
    end

    def validate(address, token)
      response = @http_service.post('/address/validate', address, token)
      return unless response.status == 200
      Address.new(response.body.map.first)
    end

    private

    def new_http_service
      Infrastructure::HttpService.new(Rails.configuration.micro_services['geo_api_base_url'])
    end
  end
end
