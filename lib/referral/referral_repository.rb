# frozen_string_literal: true

module Referral
  class ReferralRepository
    def initialize(http_service = Infrastructure::HttpService.new)
      @http_service = http_service
    end

    def referrals_by_user_id(user_id)
      response = @http_service.get("/staff/#{user_id}/referrals")
      # JSON.parse(response.body, symbolize_names: true)[:results].map { |result| Case.new(result) }
      # @(ed): y u no work???
      # response.body.map { |result| Case::Case.new(result) }
      response.body
    end
  end
end
