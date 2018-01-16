# Case Management

[![license: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![Maintainability](https://api.codeclimate.com/v1/badges/1f18e9807e5cc8ade7e5/maintainability)](https://codeclimate.com/github/ca-cwds/case-management/maintainability)

The Case Management frontend application for Child Welfare Digital Services.

Please see our [Wiki](https://github.com/ca-cwds/case-management/wiki) for the latest documentation.

## Getting Started

It is ***strongly recommended*** to have [`Docker`](https://www.docker.com/docker-mac) installed. Application development should occur within the docker container. We're hoping this lowers the barrier to entry for new contributors and reduces the occurence of _works on my machine_ bugs.

### Launching the Dev Server

As a convenience, an `npm script` is provided to spin up the dev server with a `bind-mount` in a docker container.

```
yarn start
```

or you can invoke using the docker cli:

```sh
docker build -t cwds/casemanagement .
docker run \
  -it \
  --rm  \
  --publish "3000":"3000" \
  --publish "3035":"3035" \
  --mount type=bind,src="$(pwd)"/app,dst=/app/app,consistency=cached \
  cwds/casemanagement foreman start -f Procfile.dev.docker
```

Then open http://localhost:3000 in a browser.

> _Note:_
>
> [`Foreman`](http://ddollar.github.io/foreman/) is present to manage the `webpack-dev-server` and `rails server` processes. See the [`webpacker` docs](https://github.com/rails/webpacker#development) for more information regarding this topic.
