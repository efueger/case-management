# frozen_string_literal: true

require 'rails_helper'

module Api
  describe ChildClientsController do
    describe '#show' do
      let(:child_client_repository) { instance_double('ChildClient::ChildClientRepository') }
      let(:client) { ChildClients::ChildClient.new(identifier: 5) }

      it 'has a route' do
        expect(get: 'api/child_clients/33').to route_to(
          format: 'json',
          controller: 'api/child_clients',
          action: 'show',
          id: '33'
        )
      end

      it 'returns a childclient' do
        allow(ChildClients::ChildClientRepository).to receive(:new)
          .with(no_args).and_return(child_client_repository)
        allow(child_client_repository).to receive(:show).with('5', 'token').and_return(client)
        request.session[:token] = 'token'
        get :show, params: { id: 5 }
        expect(response.body).to eq client.to_json
      end
    end

    describe '#csec' do
      let(:child_client_repository) { instance_double('ChildClient::ClientRepository') }
      let(:client) { ChildClients::ChildClient.new(identifier: 5) }

      it 'has a route' do
        expect(get: 'api/child_clients/33/csec').to route_to(
          format: 'json',
          controller: 'api/child_clients',
          action: 'csec',
          id: '33'
        )
      end

      it 'returns a csec data' do
        allow(ChildClients::ChildClientRepository).to receive(:new)
          .with(no_args).and_return(child_client_repository)
        allow(child_client_repository).to receive(:child_clients_by_csec)
          .with('5', 'token')
          .and_return(client)
        request.session[:token] = 'token'
        get :csec, params: { id: 5 }
        expect(response.body).to eq client.to_json
      end
    end

    describe '#indian_ancestory' do
      let(:child_client_repository) { instance_double('ChildClient::ClientRepository') }
      let(:client) { ChildClients::ChildClient.new(identifier: 5) }

      it 'has a route' do
        expect(get: 'api/child_clients/33/indian_ancestry_notifications').to route_to(
          format: 'json',
          controller: 'api/child_clients',
          action: 'indian_ancestry_notifications',
          id: '33'
        )
      end

      it 'returns a indian_ancestory data' do
        allow(ChildClients::ChildClientRepository).to receive(:new)
          .with(no_args).and_return(child_client_repository)
        allow(child_client_repository).to receive(:child_clients_by_indian_ancestry_notifications)
          .with('5', 'token')
          .and_return(client)
        request.session[:token] = 'token'
        get :indian_ancestry_notifications, params: { id: 5 }
        expect(response.body).to eq client.to_json
      end
    end
  end
end
