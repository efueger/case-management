# frozen_string_literal: true

require 'rails_helper'

module Infrastructure
  describe HttpService do
    let(:connection) { instance_double('Faraday::Connection') }

    describe '#get' do
      it 'makes a get request' do
        allow(Faraday).to receive(:new)
          .with(url: 'https://casemgmapi.test.cwds.io')
          .and_return(connection)
        expect(connection).to receive(:get).with('/resource')
        Infrastructure::HttpService.new.get('/resource')
      end

      it 'sets json and uses the default adapter' do
        allow(Faraday).to receive(:new)
          .with(url: 'https://casemgmapi.test.cwds.io')
          .and_yield(connection).and_return(connection)
        expect(connection).to receive(:response)
          .with(:json, parser_options: { symbolize_names: true })
        expect(connection).to receive(:adapter).with(Faraday.default_adapter)
        allow(connection).to receive(:get).with('/resource')
        Infrastructure::HttpService.new.get('/resource')
      end
    end
  end
end
