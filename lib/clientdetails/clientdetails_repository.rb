# frozen_string_literal: true

module Clientdetails
  class ClientDetailsRepository
    def initialize(http_service = Infrastructure::HttpService.new)
      @http_service = http_service
    end

    def clientdetails_by_user_id(user_id)
      response = @http_service.get("/staff/#{user_id}/clients")
      # JSON.parse(response.body, symbolize_names: true)[:results].map { |result| Client.new(result) }
      # @(ed): y u no work???
      # response.body.map { |result| Client::Client.new(result) }
      response.body
    end
  end
end
