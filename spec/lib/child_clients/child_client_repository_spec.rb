# frozen_string_literal: true

require 'spec_helper'

module ChildClients
  describe ChildClientRepository do
    let(:http_service) { instance_double('Infrastructure::HttpService') }
    let(:childclient_repository) { ChildClientRepository.new(http_service) }
    let(:token) { 'flynns_token' }

    describe '#show' do
      let(:response) { instance_double('Faraday::Response') }

      context 'with no client' do
        it 'returns an empty client' do
          allow(response).to receive(:body).and_return({})
          allow(http_service)
            .to receive(:get)
            .with('/child-clients/22', token)
            .and_return(response)
          expect(childclient_repository.show('22', token)).to eq ChildClient.new({})
        end
      end

      context 'with a client' do
        it 'returns a client' do
          allow(response).to receive(:body).and_return(common_first_name: 'El')
          allow(http_service)
            .to receive(:get)
            .with('/child-clients/33', token)
            .and_return(response)
          expect(childclient_repository.show('33', token))
            .to eq ChildClient.new(common_first_name: 'El')
        end
      end
    end

    describe '#csec' do
      describe '#child_clients_by_csec' do
        let(:response) { instance_double('Faraday::Response') }

        context 'with no csec' do
          it 'returns an empty csec data' do
            allow(response).to receive(:body).and_return({})
            allow(response).to receive(:status).and_return(404)
            allow(http_service)
              .to receive(:get)
              .with('/child-clients/66/csec', token)
              .and_return(response)
            expect(childclient_repository.child_clients_by_csec('66', token)).to eq []
          end
        end

        context 'with csec' do
          it 'returns csec' do
            allow(response).to receive(:status).and_return(200)
            allow(response).to receive(:body).and_return([{ id: '12' }])
            allow(http_service).to receive(:get)
              .with('/child-clients/66/csec', token)
              .and_return(response)
            expect(childclient_repository.child_clients_by_csec('66', token))
              .to eq [ChildClientCsec.new(id: '12')]
          end
        end
      end
    end
  end
end
