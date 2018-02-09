# frozen_string_literal: true

require 'spec_helper'
require 'rspec/dry/struct'

module Addresses
  describe Address do
    describe 'attributes' do
      subject { Address }
      it { is_expected.to have_attribute(:description, Types::String.optional) }
      it { is_expected.to have_attribute(:city, Types::String.optional) }
      it { is_expected.to have_attribute(:emergency_phone, Types::String.optional) }
      it { is_expected.to have_attribute(:emergency_phone_extension, Types::String.optional) }
      it { is_expected.to have_attribute(:foreign_address_exists, Types::Bool.optional) }
      it { is_expected.to have_attribute(:government_entity_code, Types::Int.optional) }
      it { is_expected.to have_attribute(:message_phone, Types::String.optional) }
      it { is_expected.to have_attribute(:message_phone_extension, Types::String.optional) }
      it { is_expected.to have_attribute(:other_header_address, Types::String.optional) }
      it { is_expected.to have_attribute(:post_direction_text_code, Types::String.optional) }
      it { is_expected.to have_attribute(:pre_direction_text_code, Types::String.optional) }
      it { is_expected.to have_attribute(:primary_phone, Types::String.optional) }
      it { is_expected.to have_attribute(:primary_phone_extension, Types::String.optional) }
      it { is_expected.to have_attribute(:state, Types::String.optional) }
      it { is_expected.to have_attribute(:state_code, Types::Int.optional) }
      it { is_expected.to have_attribute(:street_name, Types::String.optional) }
      it { is_expected.to have_attribute(:street_number, Types::String.optional) }
      it { is_expected.to have_attribute(:street_suffix_code, Types::Int.optional) }
      it { is_expected.to have_attribute(:unit_designator_code, Types::Int.optional) }
      it { is_expected.to have_attribute(:unit_number, Types::String.optional) }
      it { is_expected.to have_attribute(:zip, Types::Int.optional) }
      it { is_expected.to have_attribute(:zip_suffix, Types::Int.optional) }
      it { is_expected.to have_attribute(:longitude, Types::Float.optional) }
      it { is_expected.to have_attribute(:lattitude, Types::Float.optional) }
    end
  end
end
