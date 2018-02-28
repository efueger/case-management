# frozen_string_literal: true

require 'dry-struct'
require 'dry-types'

module Types
  include Dry::Types.module
end

module SystemCodes
  class SystemCode < Dry::Struct
    constructor_type :schema
    attribute :system_id, Types::String.optional
    attribute :meta_code, Types::String.optional
    attribute :category_id,Types::String.optional
    attribute :logical_id, Types::String.optional
    attribute :third_id, Types::String.optional
    attribute :other_code, Types::String.optional
    attribute :inactive_indicator, Types::String.optional
    attribute :short_description, Types::String.optional
    attribute :long_description, Types::String.optional
  end
end
