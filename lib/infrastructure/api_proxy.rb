# frozen_string_literal: true

require 'rack/proxy'

module Infrastructure
  class ApiProxy < Rack::Proxy

    def perform_request(env)
      request = Rack::Request.new(env)
      if request.path.match(/^\/api/)
        env["HTTP_HOST"] = "localhost:8080"
        # binding.pry
        # env["REQUEST_PATH"] = "/php/#{request.fullpath}"
        env["REQUEST_PATH"] = env["REQUEST_PATH"][4..-1]
        super(env)
      else
        @app.call(env)
      end
    end
  end
end
