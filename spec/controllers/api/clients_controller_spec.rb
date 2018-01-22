# frozen_string_literal: true

require 'rails_helper'

module Api
  describe ClientsController do
    describe '#show' do
      let(:client_repository) { instance_double('Client::ClientRepository') }
      let(:client) { Clients::Client.new(identifier: 5) }

      it 'has a route' do
        expect(get: 'api/clients/33').to route_to(
          format: 'json',
          controller: 'api/clients',
          action: 'show',
          id: '33'
        )
      end

      it 'returns a client' do
        allow(Clients::ClientRepository).to receive(:new)
          .with(no_args).and_return(client_repository)
        allow(client_repository).to receive(:show).with('5', 'token').and_return(client)
        request.session[:token] = 'token'
        get :show, params: { id: 5 }
        expect(response.body).to eq client.to_json
      end
    end
  end
end
