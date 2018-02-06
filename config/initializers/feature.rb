# frozen_string_literal: true

repo = Feature::Repository::SimpleRepository.new

ENV.select { |name, value| name.start_with?('FEATURE_') && (value == 'ON') } .each_key do |name|
  feature = name.sub('FEATURE_', '').downcase.to_sym
  repo.add_active_feature(feature)
end

Feature.set_repository repo
