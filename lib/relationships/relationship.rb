# frozen_string_literal: true

require 'dry-struct'
require 'dry-types'

module Types
  include Dry::Types.module
end

module Relationships
  class Relationship < Dry::Struct
    constructor_type :schema
    attribute :relationship_id, Types::String
    attribute :client_id, Types::String.optional
    attribute :related_client_id, Types::String.optional
    attribute :relationship_type_code, Types::String.optional
    attribute :absent_parent_indicator, Types::Bool.optional
    attribute :relationship_start_date, Types::String.optional
    attribute :relationship_end_date, Types::String.optional
    attribute :same_home_status, Types::String.optional
    attribute :related_client, Types::Array
  end
end
