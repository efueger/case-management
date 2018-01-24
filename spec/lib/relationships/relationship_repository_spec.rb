# frozen_string_literal: true

require 'spec_helper'
require 'relationships/relationship'
require 'json'

module Relationships
  describe RelationshipRepository do
    let(:http_service) { instance_double('Infrastructure::Service') }
    let(:relationships_repository) { RelationshipRepository.new(http_service) }
    let(:token) { 'sponge_bob_square_pants' }

    describe '#get_id' do
      let(:response) { instance_double('Faraday::Response') }

      context 'with no relationships' do
        it 'returns an empty collection' do
          allow(response).to receive(:body).and_return([])
          allow(http_service)
            .to receive(:get)
            .with('/child-clients/80/relationships', token)
            .and_return(response)
          expect(relationships_repository.get_id('80', token)).to eq []
        end
      end

      context 'with relationships' do
        it 'returns relationship' do
          allow(response).to receive(:body).and_return([{ identifier: '80' }])
          allow(http_service)
            .to receive(:get)
            .with('/child-clients/80/relationships', token)
            .and_return(response)
          expect(relationships_repository.get_id('80', token))
            .to eq [Relationship.new(identifier: '80')]
        end
      end
    end
  end
end
