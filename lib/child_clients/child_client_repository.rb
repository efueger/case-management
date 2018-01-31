# frozen_string_literal: true

module ChildClients
  class ChildClientRepository
    def initialize(http_service = Infrastructure::HttpService.new)
      @http_service = http_service
    end

    def show(id, token)
      response = @http_service.get("/child-clients/#{id}", token)
      ChildClient.new(response.body)
    end
  end
end
