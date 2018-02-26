# frozen_string_literal: true

require 'dry-struct'
require 'dry-types'

module Types
  include Dry::Types.module
end

module ChildClients
  class ChildClientIndianAncestry < Dry::Struct
    constructor_type :schema
    attribute :id, Types::String.optional
    attribute :child_client_id, Types::String.optional
    attribute :county_code, Types::String.optional
    attribute :notification_date, Types::String.optional
  end
end
