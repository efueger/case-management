# frozen_string_literal: true

module Infrastructure
  describe ServiceRegistry do
    describe 'fetch' do
      it 'retrieves values from ENV' do
        allow(ENV).to receive(:fetch).with('FOO_BASE_URL', '').and_return('https://foo.com')
        expect(ServiceRegistry.fetch(:foo_base_url)).to eq 'https://foo.com'
      end
      it 'raises ArgumentError if applied to non-symbol arg' do
        expect do
          ServiceRegistry.fetch('some string')
        end.to raise_error(ArgumentError)
      end
      it 'returns the default if not found' do
        allow(ENV).to receive(:fetch).with('DNE', 'some_default').and_return('some_default')
        expect(ServiceRegistry.fetch(:dne, 'some_default')).to eq 'some_default'
      end
    end
  end
end
