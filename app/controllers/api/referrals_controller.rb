# frozen_string_literal: true

module Api
  class ReferralsController < ActionController::API
    def referrals_by_user
      referral_respository = Referrals::ReferralRepository.new
      referrals = referral_respository.referrals_by_user_id(params[:user_id], session[:token])
      render json: referrals
    end
  end
end
