# frozen_string_literal: true

require 'rails_helper'

module Infrastructure
  describe HttpService do
    let(:connection) { instance_double('Faraday::Connection') }

    describe '#get' do
      it 'makes a get request' do
        allow(ENV).to receive(:fetch).with('CASE_API_BASE_URL').and_return('https://case-api')
        allow(Faraday).to receive(:new)
          .with(url: 'https://case-api')
          .and_return(connection)
        expect(connection).to receive(:get).with('/resource?token=showbiz_pizza_token')
        Infrastructure::HttpService.new.get('/resource', 'showbiz_pizza_token')
      end

      it 'sets json and uses the default adapter' do
        allow(ENV).to receive(:fetch).with('CASE_API_BASE_URL').and_return('https://case-api')
        allow(Faraday).to receive(:new)
          .with(url: 'https://case-api')
          .and_yield(connection).and_return(connection)
        expect(connection)
          .to receive(:response)
          .with(:json, parser_options: { symbolize_names: true })
        expect(connection).to receive(:adapter).with(Faraday.default_adapter)
        allow(connection)
          .to receive(:get)
          .with('/resource?token=showbiz_pizza_token')
        Infrastructure::HttpService.new.get('/resource', 'showbiz_pizza_token')
      end
    end

    describe '#post' do
      let(:request) { instance_double('Faraday::Request') }
      let(:post_parameters) { 'This is params' }

      it 'sets json and uses the default adapter' do
        allow(ENV).to receive(:fetch).with('CASE_API_BASE_URL').and_return('https://case-api')
        expect(Faraday)
          .to receive(:new)
          .with(url: 'https://case-api')
          .and_yield(connection).and_return(connection)
        expect(connection)
          .to receive(:response)
          .with(:json, parser_options: { symbolize_names: true })
        expect(connection).to receive(:adapter).with(Faraday.default_adapter)
        allow(connection)
          .to receive(:post)
          .with('/resource?token=showbiz_pizza_token', post_parameters)
        Infrastructure::HttpService.new.post('/resource', post_parameters, 'showbiz_pizza_token')
      end

      it 'makes a post request' do
        allow(ENV).to receive(:fetch).with('CASE_API_BASE_URL').and_return('https://case-api')
        allow(Faraday)
          .to receive(:new)
          .with(url: 'https://case-api')
          .and_yield(connection).and_return(connection)
        allow(connection)
          .to receive(:response)
          .with(:json, parser_options: { symbolize_names: true })
        allow(connection).to receive(:adapter).with(Faraday.default_adapter)
        expect(connection)
          .to receive(:post)
          .with('/resource?token=showbiz_pizza_token', post_parameters)
        Infrastructure::HttpService.new.post('/resource', post_parameters, 'showbiz_pizza_token')
      end
    end
  end
end
