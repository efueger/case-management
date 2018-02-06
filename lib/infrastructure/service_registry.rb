# frozen_string_literal: true

module Infrastructure
  module ServiceRegistry
    def self.fetch(service, default = '')
      check_is_not_symbol(service)
      ENV.fetch(to_env_name(service), default)
    end

    def self.to_env_name(service)
      service.to_s.upcase
    end
    private_class_method :to_env_name

    def self.check_is_not_symbol(service)
      raise ArgumentError, "#{service} is not a symbol" unless service.instance_of?(Symbol)
    end
    private_class_method :check_is_not_symbol
  end
end
