# frozen_string_literal: true

module Clients
  class ClientRepository
    def initialize(http_service = Infrastructure::HttpService.new)
      @http_service = http_service
    end

    def show(id, token)
      response = @http_service.get("/clients/#{id}", token)
      Client.new(response.body)
    end

    def safety_alerts(id, token)
      response = @http_service.get("/clients/#{id}/safety-alerts", token)
      response.body.map { |result| SafetyAlert.new(result) }
    end
  end
end
