# frozen_string_literal: true

require 'spec_helper'
require 'addresses/address'
require 'json'

module Addresses
  describe AddressRepository do
    let(:http_service) { instance_double('Infrastructure::Service') }
    let(:addresses_repository) { AddressRepository.new(http_service) }
    let(:token) { 'star_wars' }
    let(:address) { '202 Spurlock Ct' }

    describe '#show' do
      let(:response) { instance_double('Faraday::Response') }

      context 'with no addresses' do
        it 'returns an empty addresses' do
          allow(response).to receive(:status)
            .and_return(404)
          allow(http_service)
            .to receive(:get)
            .with('/clients/80/addresses', token)
            .and_return(response)
          expect(addresses_repository.addresses_by_client_id('80', token))
            .to eq []
        end
      end

      context 'with addresses' do
        it 'returns addresses' do
          allow(response)
            .to receive(:status)
            .and_return(200)
          allow(response)
            .to receive(:body)
            .and_return([{ address: { id: '805' } }, { address: { id: '808' } }])
          allow(http_service)
            .to receive(:get)
            .with('/clients/80/addresses', token)
            .and_return(response)
          expect(addresses_repository.addresses_by_client_id('80', token))
            .to eq [Address.new(id: '805'), Address.new(id: '808')]
        end
      end
    end
  end
end
