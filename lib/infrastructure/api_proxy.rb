# frozen_string_literal: true

require 'rack/proxy'

module Infrastructure
  class ApiProxy < Rack::Proxy
    def perform_request(env)
      request = Rack::Request.new(env)
      if request.path.match?(%r{^\/api})
        env['HTTP_HOST'] = ENV.fetch('CASE_API_HOST', 'localhost:8080')
        env['REQUEST_PATH'].sub!(%r{^\/api}, '')
        super(env)
      else
        @app.call(env)
      end
    end
  end
end
