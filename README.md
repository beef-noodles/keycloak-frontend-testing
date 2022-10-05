# keycloak-front-demo

> A Vue.js & Keycloak project

## Build Setup

Ref to this [artical](https://www.keycloak.org/getting-started/getting-started-docker) to setup container and follow the steps to config your keycloak

And set `Web origins` as `http://localhost:8081`, `Valid redirect URIs` as `http://localhost:8081/*`

``` bash
# install dependencies
pnpm install

# serve with hot reload at localhost:8080
pnpm run dev

# build for production with minification
pnpm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
