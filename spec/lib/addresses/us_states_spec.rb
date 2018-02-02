# frozen_string_literal: true

require 'spec_helper'

module Addresses
  describe UsStates do
    context 'state code exist' do
      it 'looks up a US state code' do
        expect(UsStates.new.us_state(1828)).to eq 'CA'
        expect(UsStates.new.us_state(1823)).to eq 'AK'
      end
    end

    context 'state code does not exist' do
      it 'looks up a US state code' do
        expect(UsStates.new.us_state(1)).to eq ''
      end
    end
  end
end
