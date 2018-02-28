# frozen_string_literal: true

module SystemCodes
  class SystemCodeRepository
    def initialize(http_service = Infrastructure::HttpService.new)
      @http_service = http_service
    end

    def show(id, token)
      response = @http_service.get("/system-codes/#{id}", token)
      # SystemCode.new(response.body)
      response.body.map { |result| SystemCode.new(result) }
    end
  end
end
