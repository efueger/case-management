# frozen_string_literal: true

require 'rails_helper'

module Api
  describe PlacementsController do
    describe '#get_clients_by_related_client_id' do
      let(:address_map_service) { instance_double('Placements::AddressMapService') }
      let(:address_map) { Placements::AddressMapService.new }

      it 'has a route' do
        expect(get: 'api/placements/80').to route_to(
          action: 'clients_by_related_client_id',
          client_id: '80',
          controller: 'api/placements',
          format: 'json'
        )
      end

      it 'returns clients' do
        allow(Placements::AddressMapService)
          .to receive(:new)
          .with(no_args)
          .and_return(address_map_service)
        allow(address_map_service)
          .to receive(:get_addresses)
          .with('bugsbunny', 'token1')
          .and_return([Clients::Client.new])
        request.session[:token] = 'token1'
        get :clients_by_related_client_id, params: { client_id: 'bugsbunny' }
        expect(response.body).to eq [Clients::Client.new].to_json
      end
    end
  end
end
