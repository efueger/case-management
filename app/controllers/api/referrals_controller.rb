# frozen_string_literal: true

module Api
  class ReferralsController < ActionController::API
    def referrals_by_user
      referrals = Referral::ReferralRepository.new.referrals_by_user_id params[:user_id]
      render json: referrals
    end
  end
end
