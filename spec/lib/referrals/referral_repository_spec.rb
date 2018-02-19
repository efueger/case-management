# frozen_string_literal: true

require 'spec_helper'
require 'referrals/referral'
require 'json'

module Referrals
  describe ReferralRepository do
    let(:http_service) { instance_double('Infrastructure::Service') }
    let(:referral_repository) { ReferralRepository.new(http_service) }

    describe '#referrals_by_user' do
      let(:response) { instance_double('Faraday::Response') }
      let(:token) { 'chuck_e_cheese_token' }

      context 'with no referrals' do
        it 'returns an empty collection' do
          allow(response).to receive(:status).and_return(404)
          allow(response).to receive(:body).and_return([])
          allow(http_service)
            .to receive(:get)
            .with('/staff/12/referrals', token)
            .and_return(response)
          expect(referral_repository.referrals_by_user_id('12', token)).to eq []
        end
      end

      context 'with referrals' do
        it 'returns referrals' do
          allow(response).to receive(:status).and_return(200)
          allow(response).to receive(:body).and_return([{ identifier: '12' }])
          allow(http_service)
            .to receive(:get)
            .with('/staff/12/referrals', token)
            .and_return(response)
          expect(referral_repository.referrals_by_user_id('12', token))
            .to eq [Referral.new(identifier: '12')]
        end
      end
    end
  end
end
