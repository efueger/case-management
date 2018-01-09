# frozen_string_literal: true

module Case
  class CaseRepository
    def initialize(http_service = Infrastructure::HttpService.new)
      @http_service = http_service
    end

    def cases_by_user_id(user_id)
      response = @http_service.get("/clients/#{user_id}")
      # JSON.parse(response.body, symbolize_names: true)[:results].map { |result| Case.new(result) }
      # @(ed): y u no work???
      # response.body.map { |result| Case.new(result) }
      response.body
    end
  end
end
