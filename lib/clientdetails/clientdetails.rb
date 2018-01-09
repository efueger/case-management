# frozen_string_literal: true

require 'dry-struct'
require 'dry-types'

module Types
  include Dry::Types.module
end

module Clientdetails
  class Clientdetails < Dry::Struct
    constructor_type :schema

    attribute :identifier, Types::String.optional
  end
end
