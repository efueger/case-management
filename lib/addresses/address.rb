# frozen_string_literal: true

require 'dry-struct'
require 'dry-types'

module Types
  include Dry::Types.module
end

module Addresses
  class Address < Dry::Struct
    constructor_type :schema

    attribute :id, Types::String
    attribute :description, Types::String.optional
    attribute :city, Types::String.optional
    attribute :emergency_phone, Types::String.optional
    attribute :emergency_phone_extension, Types::String.optional
    attribute :foreign_address_exists, Types::Bool.optional
    attribute :government_entity_code, Types::Int.optional
    attribute :latitude, Types::Float.optional
    attribute :longitude, Types::Float.optional
    attribute :message_phone, Types::String.optional
    attribute :message_phone_extension, Types::String.optional
    attribute :other_header_address, Types::String.optional
    attribute :post_direction_text_code, Types::String.optional
    attribute :pre_direction_text_code, Types::String.optional
    attribute :primary_phone, Types::String.optional
    attribute :primary_phone_extension, Types::String.optional
    attribute :state, Types::String.optional
    attribute :state_code, Types::Int.optional
    attribute :street_name, Types::String.optional
    attribute :street_number, Types::String.optional
    attribute :street_suffix_code, Types::Int.optional
    attribute :unit_designator_code, Types::Int.optional
    attribute :unit_number, Types::String.optional
    attribute :zip, Types::Int.optional
    attribute :zip_suffix, Types::Int.optional
  end
end
