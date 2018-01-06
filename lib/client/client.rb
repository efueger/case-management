# frozen_string_literal: true

require 'dry-struct'
require 'dry-types'

module Types
  include Dry::Types.module
end

module Client
  class Client < Dry::Struct
    constructor_type :schema

    attribute :identifier, Types::String.optional
  end
end
