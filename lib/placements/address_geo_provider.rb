# frozen_string_literal: true

module Placements
  class AddressGeoProvider
    def initialize(geo_repository = Addresses::GeoRepository.new)
      @geo_repository = geo_repository
    end

    def provide_geo(address, token)
      address_attributes = address.to_h
      address_attributes[:state] = Addresses::UsStates.new.us_state(address[:state_code])
      address_formatted = Addresses::AddressFormatter.new.proper(address_attributes)
      geo_address = @geo_repository.validate(address_formatted, token)
      address_attributes[:latitude] = geo_address.latitude
      address_attributes[:longitude] = geo_address.longitude
      Addresses::Address.new(address_attributes)
    end
  end
end
