# frozen_string_literal: true

require 'rails_helper'

module Api
  describe ChildClientsController do
    describe '#show' do
      let(:childclient_repository) { instance_double('ChildClient::ChildClientRepository') }
      let(:client) { ChildClients::ChildClient.new(identifier: 5) }

      it 'has a route' do
        expect(get: 'api/childclients/33').to route_to(
          format: 'json',
          controller: 'api/childclients',
          action: 'show',
          id: '33'
        )
      end

      it 'returns a childclient' do
        allow(ChildClients::ChildClientRepository).to receive(:new)
          .with(no_args).and_return(childclient_repository)
        allow(childclient_repository).to receive(:show).with('5', 'token').and_return(client)
        request.session[:token] = 'token'
        get :show, params: { id: 5 }
        expect(response.body).to eq childclient.to_json
      end
    end
  end
end
