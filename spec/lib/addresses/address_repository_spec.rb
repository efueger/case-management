# frozen_string_literal: true

require 'spec_helper'
require 'addresses/address'
require 'json'

module Addresses
  describe AddressRepository do
    let(:http_service) { instance_double('Infrastructure::Service') }
    let(:addresses_repository) { AddressRepository.new(http_service) }
    let(:token) { 'star_wars' }

    describe '#show' do
      let(:response) { instance_double('Faraday::Response') }

      context 'with no addresses' do
        it 'returns an empty addresses' do
          allow(response).to receive(:body).and_return({})
          allow(http_service)
            .to receive(:get)
            .with('/addresses/80', token)
            .and_return(response)
          expect(addresses_repository.show('80', token)).to eq Address.new({})
        end
      end

      context 'with addresses' do
        it 'returns addresses' do
          allow(response).to receive(:body).and_return(identifier: '80')
          allow(http_service)
            .to receive(:get)
            .with('/addresses/80', token)
            .and_return(response)
          expect(addresses_repository.show('80', token))
            .to eq Address.new(identifier: '80')
        end
      end
    end
  end
end
