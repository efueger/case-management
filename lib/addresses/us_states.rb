# frozen_string_literal: true

# rubocop:disable Metrics/ClassLength, Metrics/MethodLength

module Addresses
  class UsStates
    def us_state(state_code)
      short_state = states.find { |state| state[:system_id] == state_code }
      short_state ? short_state[:logical_id] : ''
    end

    private

    def states
      [
        {
          'system_id': 1823,
          'logical_id': 'AK',
          'long_description': 'Alaska'
        },
        {
          'system_id': 1824,
          'logical_id': 'AL',
          'long_description': 'Alabama'
        },
        {
          'system_id': 1825,
          'logical_id': 'AM',
          'long_description': 'American Samoa'
        },
        {
          'system_id': 1826,
          'logical_id': 'AR',
          'long_description': 'Arkansas'
        },
        {
          'system_id': 1827,
          'logical_id': 'AZ',
          'long_description': 'Arizona'
        },
        {
          'system_id': 1828,
          'logical_id': 'CA',
          'long_description': 'California'
        },
        {
          'system_id': 1829,
          'logical_id': 'CM',
          'long_description': 'Northern Marianas Islands'
        },
        {
          'system_id': 1830,
          'logical_id': 'CO',
          'long_description': 'Colorado'
        },
        {
          'system_id': 1831,
          'logical_id': 'CT',
          'long_description': 'Connecticut'
        },
        {
          'system_id': 1832,
          'logical_id': 'CZ',
          'long_description': 'Canal Zone'
        },
        {
          'system_id': 1833,
          'logical_id': 'DC',
          'long_description': 'District of Columbia'
        },
        {
          'system_id': 1834,
          'logical_id': 'DE',
          'long_description': 'Delaware'
        },
        {
          'system_id': 1835,
          'logical_id': 'FL',
          'long_description': 'Florida'
        },
        {
          'system_id': 1836,
          'logical_id': 'GA',
          'long_description': 'Georgia'
        },
        {
          'system_id': 1837,
          'logical_id': 'GU',
          'long_description': 'Guam'
        },
        {
          'system_id': 1838,
          'logical_id': 'HI',
          'long_description': 'Hawaii'
        },
        {
          'system_id': 1839,
          'logical_id': 'IA',
          'long_description': 'Iowa'
        },
        {
          'system_id': 1840,
          'logical_id': 'ID',
          'long_description': 'Idaho'
        },
        {
          'system_id': 1841,
          'logical_id': 'IL',
          'long_description': 'Illinois'
        },
        {
          'system_id': 1842,
          'logical_id': 'IN',
          'long_description': 'Indiana'
        },
        {
          'system_id': 1843,
          'logical_id': 'KS',
          'long_description': 'Kansas'
        },
        {
          'system_id': 1844,
          'logical_id': 'KY',
          'long_description': 'Kentucky'
        },
        {
          'system_id': 1845,
          'logical_id': 'LA',
          'long_description': 'Louisiana'
        },
        {
          'system_id': 1846,
          'logical_id': 'MA',
          'long_description': 'Massachusetts'
        },
        {
          'system_id': 1847,
          'logical_id': 'MD',
          'long_description': 'Maryland'
        },
        {
          'system_id': 1848,
          'logical_id': 'ME',
          'long_description': 'Maine'
        },
        {
          'system_id': 1849,
          'logical_id': 'MI',
          'long_description': 'Michigan'
        },
        {
          'system_id': 1850,
          'logical_id': 'MN',
          'long_description': 'Minnesota'
        },
        {
          'system_id': 1851,
          'logical_id': 'MO',
          'long_description': 'Missouri'
        },
        {
          'system_id': 1852,
          'logical_id': 'MS',
          'long_description': 'Mississippi'
        },
        {
          'system_id': 1853,
          'logical_id': 'MT',
          'long_description': 'Montana'
        },
        {
          'system_id': 1854,
          'logical_id': 'NC',
          'long_description': 'North Carolina'
        },
        {
          'system_id': 1855,
          'logical_id': 'ND',
          'long_description': 'North Dakota'
        },
        {
          'system_id': 1856,
          'logical_id': 'NE',
          'long_description': 'Nebraska'
        },
        {
          'system_id': 1857,
          'logical_id': 'NH',
          'long_description': 'New Hampshire'
        },
        {
          'system_id': 1858,
          'logical_id': 'NJ',
          'long_description': 'New Jersey'
        },
        {
          'system_id': 1859,
          'logical_id': 'NM',
          'long_description': 'New Mexico'
        },
        {
          'system_id': 1860,
          'logical_id': 'NV',
          'long_description': 'Nevada'
        },
        {
          'system_id': 1861,
          'logical_id': 'NY',
          'long_description': 'New York'
        },
        {
          'system_id': 1862,
          'logical_id': 'OH',
          'long_description': 'Ohio'
        },
        {
          'system_id': 1863,
          'logical_id': 'OK',
          'long_description': 'Oklahoma'
        },
        {
          'system_id': 1864,
          'logical_id': 'OR',
          'long_description': 'Oregon'
        },
        {
          'system_id': 1865,
          'logical_id': 'PA',
          'long_description': 'Pennsylvania'
        },
        {
          'system_id': 1866,
          'logical_id': 'PR',
          'long_description': 'Puerto Rico'
        },
        {
          'system_id': 1867,
          'logical_id': 'RI',
          'long_description': 'Rhode Island'
        },
        {
          'system_id': 1868,
          'logical_id': 'SC',
          'long_description': 'South Carolina'
        },
        {
          'system_id': 1869,
          'logical_id': 'SD',
          'long_description': 'South Dakota'
        },
        {
          'system_id': 1870,
          'logical_id': 'TN',
          'long_description': 'Tennessee'
        },
        {
          'system_id': 1871,
          'logical_id': 'TT',
          'long_description': 'Trust Territories'
        },
        {
          'system_id': 1872,
          'logical_id': 'TX',
          'long_description': 'Texas'
        },
        {
          'system_id': 1873,
          'logical_id': 'UT',
          'long_description': 'Utah'
        },
        {
          'system_id': 1874,
          'logical_id': 'VA',
          'long_description': 'Virginia'
        },
        {
          'system_id': 1875,
          'logical_id': 'VI',
          'long_description': 'Virgin Islands'
        },
        {
          'system_id': 1876,
          'logical_id': 'VT',
          'long_description': 'Vermont'
        },
        {
          'system_id': 1877,
          'logical_id': 'WA',
          'long_description': 'Washington'
        },
        {
          'system_id': 1878,
          'logical_id': 'WI',
          'long_description': 'Wisconsin'
        },
        {
          'system_id': 1879,
          'logical_id': 'WV',
          'long_description': 'West Virginia'
        },
        {
          'system_id': 1880,
          'logical_id': 'WY',
          'long_description': 'Wyoming'
        }
      ]
    end
  end
end
# rubocop:enable Metrics/ClassLength, Metrics/MethodLength
