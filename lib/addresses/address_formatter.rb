# frozen_string_literal: true

module Addresses
  class AddressFormatter
    def proper(address)
      {
        'street_address': "#{address[:street_number]} #{address[:street_name]}",
        'city': address[:city].to_s,
        'state': address[:state].to_s,
        'zip': address[:zip].to_s
      }
    end
  end
end
