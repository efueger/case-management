# frozen_string_literal: true

require 'spec_helper'

module Placements
  describe AddressMapService do
    let(:address_repository) { instance_double('Addresses::AddressRepository') }
    let(:geo_repository) { instance_double('Addresses::GeoRepository') }
    let(:relationship_repository) { instance_double('Relationships::RelationshipRepository') }
    let(:addresss_geo_provider) { AddressGeoProvider.new(geo_repository) }
    let(:address_map_service) do
      AddressMapService.new(address_repository, relationship_repository, addresss_geo_provider)
    end

    describe '#get_addresses' do
      let(:related_client) { Clients::Client.new(identifier: 'groot', birth_dt: '1989-06-01') }
      let(:token) { 'sauron' }

      context 'with child address and one relationship address' do
        let(:post_param_street_address_starlord) do
          { street_address: ' Sesame st', city: '', state: 'AK', zip: '' }
        end
        let(:post_param_street_address_groot) do
          { street_address: ' this st', city: '', state: 'CA', zip: '' }
        end

        it 'returns a two clients with address' do
          allow(relationship_repository)
            .to receive(:get_id)
            .with('starlord', token)
            .and_return([Relationships::Relationship.new(related_client: related_client)])
          allow(address_repository)
            .to receive(:addresses_by_client_id)
            .with('starlord', token)
            .and_return([Addresses::Address.new(street_name: 'Sesame st', state_code: 1823)])
          allow(address_repository)
            .to receive(:addresses_by_client_id)
            .with('groot', token)
            .and_return([Addresses::Address.new(street_name: 'this st', state_code: 1828)])
          allow(geo_repository)
            .to receive(:validate)
            .with(post_param_street_address_starlord, token)
            .and_return(Addresses::Address.new(latitude: 1.1, longitude: 2.2))
          allow(geo_repository)
            .to receive(:validate)
            .with(post_param_street_address_groot, token)
            .and_return(Addresses::Address.new(latitude: 3.3, longitude: 4.4))
          expect(address_map_service.get_addresses('starlord', token))
            .to eq [Clients::Client.new(identifier: 'groot',
                                        birth_dt: '1989-06-01',
                                        address: Addresses::Address.new(street_name: 'this st',
                                                                        state_code: 1828,
                                                                        state: 'CA',
                                                                        latitude: 3.3,
                                                                        longitude: 4.4)),
                    Clients::Client.new(identifier: 'starlord',
                                        address: Addresses::Address.new(street_name: 'Sesame st',
                                                                        state_code: 1823,
                                                                        state: 'AK',
                                                                        latitude: 1.1,
                                                                        longitude: 2.2))]
        end
      end

      context 'with child address and one relationship but no address ' do
        it 'returns clients with no addresses' do
          allow(relationship_repository)
            .to receive(:get_id)
            .with('starlord', token)
            .and_return([Relationships::Relationship.new(related_client: related_client)])
          allow(address_repository)
            .to receive(:addresses_by_client_id)
            .with('starlord', token)
            .and_return([])
          allow(address_repository)
            .to receive(:addresses_by_client_id)
            .with('groot', token)
            .and_return([])
          expect(address_map_service.get_addresses('starlord', token))
            .to eq [Clients::Client.new(identifier: 'groot', birth_dt: '1989-06-01'),
                    Clients::Client.new(identifier: 'starlord')]
        end
      end

      context 'with child address no relationship' do
        let(:post_param_street_address_starlord) do
          { street_address: ' Sesame st', city: '', state: 'AK', zip: '' }
        end

        it 'returns child client with address' do
          allow(address_repository)
            .to receive(:addresses_by_client_id)
            .with('starlord', token)
            .and_return([Addresses::Address.new(street_name: 'Sesame st', state_code: 1823)])
          allow(relationship_repository)
            .to receive(:get_id)
            .with('starlord', token)
            .and_return([])
          allow(geo_repository)
            .to receive(:validate)
            .with(post_param_street_address_starlord, token)
            .and_return(Addresses::Address.new(latitude: 1.1, longitude: 2.2))
          expect(address_map_service.get_addresses('starlord', token))
            .to eq [Clients::Client.new(identifier: 'starlord',
                                        address: Addresses::Address.new(street_name: 'Sesame st',
                                                                        state_code: 1823,
                                                                        state: 'AK',
                                                                        latitude: 1.1,
                                                                        longitude: 2.2))]
        end
      end
    end
  end
end
