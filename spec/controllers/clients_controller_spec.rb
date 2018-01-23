# frozen_string_literal: true

require 'rails_helper'

describe ClientsController do
  describe '#index' do
    it 'has a route' do
      expect(get: 'clients/index').to route_to(
        controller: 'clients',
        action: 'index'
      )
    end
  end
end
