# frozen_string_literal: true

module Placements
  class AddressMapService
    def initialize(address_repository = Addresses::AddressRepository.new,
                   relationships_repository = Relationships::RelationshipRepository.new,
                   address_geo_provider = AddressGeoProvider.new)
      @address_repository = address_repository
      @address_geo_provider = address_geo_provider
      @relationships_repository = relationships_repository
    end

    def get_addresses(client_id, token)
      relationships = @relationships_repository.get_id(client_id, token)
      related_clients = relationships.map(&:related_client)
      include_child_address(related_clients, client_id)
      decorate_with_addresses(related_clients, token)
    end

    private

    def include_child_address(related_clients, client_id)
      related_clients << Clients::Client.new(identifier: client_id)
    end

    def decorate_with_addresses(related_clients, token)
      related_clients.map do |client|
        client_attributes = client.to_h
        client_attributes[:address] = @address_repository.addresses_by_client_id(client.identifier,
                                                                                 token).first
        next Clients::Client.new(client_attributes.compact) if client_attributes[:address].nil?
        client_attributes[:address] = @address_geo_provider.provide_geo(client_attributes[:address],
                                                                        token)
        Clients::Client.new(client_attributes.compact)
      end
    end
  end
end
