FROM ruby:2.4.2
ENV ENVIRONMENT_REFRESH 2017-10-11
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash - && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update -qq && apt-get install -y build-essential libpq-dev yarn && \
    rm -rf /var/lib/apt/lists/*
RUN mkdir /app
WORKDIR /app
RUN gem install foreman
ADD Gemfile Gemfile.lock /app/
RUN bundle install --jobs 20 --retry 5
ADD package.json yarn.lock /app/
RUN yarn install --production=false --non-interactive --frozen-lockfile
ADD . /app
# ENV NODE_ENV production
# ENV RAILS_ENV production
RUN NODE_ENV=production RAILS_ENV=production bundle exec rails assets:precompile
RUN yarn install --production=false --non-interactive --frozen-lockfile
EXPOSE 3000 3035
CMD ["bundle", "exec", "rails", "server"]
