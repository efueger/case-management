# frozen_string_literal: true

require 'spec_helper'
require 'rspec/dry/struct'

module Clients
  describe SafetyAlert do
    describe 'attributes' do
      subject { SafetyAlert }
      it {
        is_expected.to have_attribute(:activation_government_entity_code, Types::String.optional)
      }
      it { is_expected.to have_attribute(:activation_date, Types::String.optional) }
      it { is_expected.to have_attribute(:activation_explanation_text_id, Types::String.optional) }
      it { is_expected.to have_attribute(:client_id, Types::String.optional) }
      it { is_expected.to have_attribute(:activation_reason_code, Types::String.optional) }
      it { is_expected.to have_attribute(:third_id, Types::String.optional) }
      it {
        is_expected.to have_attribute(:deactivation_government_entity_code, Types::String.optional)
      }
      it { is_expected.to have_attribute(:deactivation_date, Types::String.optional) }
      it {
        is_expected.to have_attribute(:deactivation_explanation_text_id, Types::String.optional)
      }
    end
  end
end
