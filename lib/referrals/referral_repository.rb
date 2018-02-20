# frozen_string_literal: true

module Referrals
  class ReferralRepository
    def initialize(http_service = Infrastructure::HttpService.new)
      @http_service = http_service
    end

    def referrals_by_user_id(user_id, token)
      response = @http_service.get("/staff/#{user_id}/referrals", token)
      return [] if response.status == 404
      response.body.map { |result| Referral.new(result) }
    end
  end
end
