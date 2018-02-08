# frozen_string_literal: true

require 'dry-struct'
require 'dry-types'

module Types
  include Dry::Types.module
end

module Clients
  class SafetyAlert < Dry::Struct
    constructor_type :schema
    attribute :activation_government_entity_code, Types::String.optional
    attribute :activation_date, Types::String.optional
    attribute :activation_explanation_text_id, Types::String.optional
    attribute :client_id, Types::String.optional
    attribute :activation_reason_code, Types::String.optional
    attribute :third_id, Types::String.optional
    attribute :deactivation_government_entity_code, Types::String.optional
    attribute :deactivation_date, Types::String.optional
    attribute :deactivation_explanation_text_id, Types::String.optional
  end
end
