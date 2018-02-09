# frozen_string_literal: true

require 'spec_helper'

module Addresses
  describe GeoRepository do
    let(:http_service) { instance_double('Infrastructure::Service') }
    let(:geo_repository) { GeoRepository.new(http_service) }
    let(:token) { 'star_wars' }
    let(:address) { '202 Spurlock Ct' }

    describe '#validate' do
      let(:response) { instance_double('Faraday::Response') }
      let(:valid_address) { { 'longitude': -121.25118, 'lattitude': 38.74037 } }
      let(:post_params) do
        {
          'street_address': '202 Ct',
          'city': 'Roseville',
          'state': 'CA',
          'zip': '95661'
        }
      end

      context 'with addresses' do
        it 'returns addresses with lattitude and longitude' do
          allow(response)
            .to receive(:status)
            .and_return(200)
          allow(response)
            .to receive(:body)
            .and_return([valid_address])
          allow(http_service)
            .to receive(:post)
            .with('/address/validate', post_params, token)
            .and_return(response)
          expect(geo_repository.validate(post_params, token))
            .to eq Address.new(valid_address)
        end
      end

      context 'with invalid address' do
        it 'returns a nil' do
          allow(response)
            .to receive(:status)
            .and_return(422)
          allow(http_service)
            .to receive(:post)
            .with('/address/validate', post_params, token)
            .and_return(response)
          expect(geo_repository.validate(post_params, token))
            .to eq nil
        end
      end
    end
  end
end
