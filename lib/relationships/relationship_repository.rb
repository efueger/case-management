# frozen_string_literal: true

module Relationships
  class RelationshipRepository
    def initialize(http_service = Infrastructure::HttpService.new)
      @http_service = http_service
    end

    def get_id(id, token)
      response = @http_service.get("/child-clients/#{id}/relationships", token)
      response.body.map { |result| Relationship.new(result) }
    end
  end
end
