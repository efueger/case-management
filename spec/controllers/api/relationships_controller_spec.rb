# frozen_string_literal: true

require 'rails_helper'

module Api
  describe RelationshipsController do
    describe '#relationships_by_client' do
      let(:relationship_repository) { instance_double('Relationships::AddressRepository') }
      let(:relationship) { Relationships::Relationship.new(identifier: 10) }

      it 'has a route' do
        expect(get: 'api/relationships/80').to route_to(
          controller: 'api/relationships',
          action: 'relationships_by_client',
          id: '80',
          format: 'json'
        )
      end

      it 'returns relationships' do
        allow(Relationships::RelationshipRepository).to receive(:new)
          .with(no_args).and_return(relationship_repository)
        allow(relationship_repository).to receive(:get_id)
          .with('80', 'token').and_return([relationship])
        request.session[:token] = 'token'
        get :relationships_by_client, params: { id: 80 }
        expect(response.body).to eq [relationship].to_json
      end
    end
  end
end
