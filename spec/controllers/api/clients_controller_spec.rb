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
    describe '#safety_alerts' do
      let(:client_repository) { instance_double('Client::ClientRepository') }
      let(:client) { Clients::Client.new(identifier: 5) }

      it 'has a route' do
        expect(get: 'api/clients/33/safety_alerts').to route_to(
          format: 'json',
          controller: 'api/clients',
          action: 'safety_alerts',
          id: '33'
        )
      end

      it 'returns a safety_alerts' do
        allow(Clients::ClientRepository).to receive(:new)
          .with(no_args).and_return(client_repository)
        allow(client_repository).to receive(:safety_alerts).with('5', 'token').and_return(client)
        request.session[:token] = 'token'
        get :safety_alerts, params: { id: 5 }
        expect(response.body).to eq client.to_json
      end
    end
  end
end
