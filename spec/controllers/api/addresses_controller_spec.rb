# frozen_string_literal: true

require 'rails_helper'

module Api
  describe AddressesController do
    describe '#address_by_client' do
      let(:address_repository) { instance_double('Addresses::AddressRepository') }
      let(:address) { Addresses::Address.new(client_id: 10) }

      it 'has a route' do
        expect(get: 'api/addresses/80').to route_to(
          controller: 'api/addresses',
          action: 'address_by_client',
          client_id: '80',
          format: 'json'
        )
      end

      it 'returns relationships' do
        allow(Addresses::AddressRepository).to receive(:new)
          .with(no_args).and_return(address_repository)
        allow(address_repository).to receive(:show)
          .with('80', 'token').and_return(address)
        request.session[:token] = 'token'
        get :address_by_client, params: { client_id: 80 }
        expect(response.body).to eq address.to_json
      end
    end
  end
end
