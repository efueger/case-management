# frozen_string_literal: true

require 'rails_helper'

module Api
  describe ReferralsController do
    describe '#cases_by_user' do
      let(:referral_repository) { instance_double('Referrals::ReferralRepository') }
      let(:referral) { Referrals::Referral.new(identifier: 77) }

      it 'has a route' do
        expect(get: 'api/referrals/101').to route_to(
          controller: 'api/referrals',
          action: 'referrals_by_user',
          user_id: '101',
          format: 'json'
        )
      end

      it 'returns referrals' do
        allow(Referrals::ReferralRepository).to receive(:new)
          .with(no_args).and_return(referral_repository)
        allow(referral_repository).to receive(:referrals_by_user_id)
          .with('42').and_return([referral])
        get :referrals_by_user, params: { user_id: 42 }
        expect(response.body).to eq [referral].to_json
      end
    end
  end
end
