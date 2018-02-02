# frozen_string_literal: true

require 'spec_helper'

module Placements
  describe AddressGeoProvider do
    let(:geo_repository) { instance_double('Addresses::GeoRepository') }
    let(:address_geo_provider) do
      AddressGeoProvider.new(geo_repository)
    end

    describe '#geo_provider' do
      let(:token) { 'sauron' }

      context 'with complete address' do
        let(:address) do
          {
            street_name: 'Sesame st',
            city: '',
            state: 'AK',
            state_code: 1823,
            zip: ''
          }
        end
        let(:post_param_address) do
          {
            street_address: ' Sesame st',
            city: '',
            state: 'AK',
            zip: ''
          }
        end
        let(:expected_geo) do
          Addresses::Address.new(city: '',
                                 state_code: 1823,
                                 state: 'AK',
                                 street_name: 'Sesame st',
                                 latitude: 1.1,
                                 longitude: 2.2,
                                 zip: '')
        end

        it 'returns an address with latitude and longitude' do
          allow(geo_repository)
            .to receive(:validate)
            .with(post_param_address, token)
            .and_return(Addresses::Address.new(latitude: 1.1, longitude: 2.2))
          expect(address_geo_provider.provide_geo(address, token))
            .to eq expected_geo
        end
      end
    end
  end
end
