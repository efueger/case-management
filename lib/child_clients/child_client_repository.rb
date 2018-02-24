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

    def child_clients_by_csec(id, token)
      response = @http_service.get("/child-clients/#{id}/csec", token)
      return [] if response.status == 404
      response.body.map { |result| ChildClientCsec.new(result) }
    end

    def child_clients_by_indian_ancestry_notifications(id, token)
      response = @http_service.get("/child-clients/#{id}/indian-ancestry-notifications", token)
      return [] if response.status == 404
      require 'pry'
      binding.pry
      response.body.map { |result| ChildClientIndianAncestry.new(result) }
    end
  end
end
