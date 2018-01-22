# frozen_string_literal: true

require 'spec_helper'

module Clients
  describe ClientRepository do
    let(:http_service) { instance_double('Infrastructure::HttpService') }
    let(:client_repository) { ClientRepository.new(http_service) }
    let(:token) { 'flynns_token' }

    describe '#show' do
      let(:response) { instance_double('Faraday::Response') }

      context 'with no client' do
        it 'returns an empty client' do
          allow(response).to receive(:body).and_return({})
          allow(http_service)
            .to receive(:get)
            .with('/clients/22', token)
            .and_return(response)
          expect(client_repository.show('22', token)).to eq Client.new({})
        end
      end

      context 'with a client' do
        it 'returns a client' do
          allow(response).to receive(:body).and_return(common_first_name: 'El')
          allow(http_service)
            .to receive(:get)
            .with('/clients/33', token)
            .and_return(response)
          expect(client_repository.show('33', token)).to eq Client.new(common_first_name: 'El')
        end
      end
    end
  end
end
