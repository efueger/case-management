# frozen_string_literal: true

require 'spec_helper'

module Addresses
  describe AddressFormatter do
    describe '#proper' do
      context 'has street address' do
        let(:expected_address) do
          {
            'street_address': '202 Spurlock Ct.',
            'city': 'Roseville',
            'state': 'CA',
            'zip': '95661'
          }
        end
        let(:address) do
          {
            street_number: '202',
            street_name: 'Spurlock Ct.',
            city: 'Roseville',
            state: 'CA',
            zip: '95661'
          }
        end

        it 'returns a properly formatted street address' do
          expect(AddressFormatter.new.proper(address)).to eq expected_address
        end
      end
      context 'no address' do
        let(:expected_address) do
          {
            'street_address': ' ',
            'city': '',
            'state': '',
            'zip': ''
          }
        end
        let(:address_nil) do
          {
            street_number: nil,
            street_name: nil,
            city: nil,
            state: nil,
            zip: nil
          }
        end

        it 'returns an empty address' do
          expect(AddressFormatter.new.proper(address_nil)).to eq expected_address
        end
      end
    end
  end
end
