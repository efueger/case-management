# frozen_string_literal: true

require 'dry-struct'
require 'dry-types'

module Types
  include Dry::Types.module
end

module ChildClients
  class ChildClientCsec < Dry::Struct
    constructor_type :schema
    attribute :child_client_id, Types::String.optional
    attribute :sexual_exploitation_type, Types::String.optional
    attribute :start_date, Types::String.optional
    attribute :end_date, Types::String.optional
  end
end
