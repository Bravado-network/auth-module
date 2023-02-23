That version is patched by:
1. If there is an error during fetchUser - it won't thrown outside the module. In our code the error occurred because for unlogged user endpoint returns `false` instead of `{}`
2. Cookie strategy looks only for cookie existance to send an auth request, instead of token check + cookie in main repo (probably bug)

Release:
- yarn bump-next && yarn build
- push
- create new release https://github.com/Bravado-network/auth-module/releases

===================
<h1 align="center" >🔑 Auth Module</h1>
<p align="center">Zero-boilerplate authentication support for Nuxt.js!</p>

<p align="center">
<a href="https://david-dm.org/nuxt-community/auth-module">
    <img alt="" src="https://david-dm.org/nuxt-community/auth-module/status.svg?style=flat-square">
</a>
<a href="https://standardjs.com">
    <img alt="" src="https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square">
</a>
<a href="https://circleci.com/gh/nuxt-community/auth-module">
    <img alt="" src="https://img.shields.io/circleci/project/github/nuxt-community/auth-module.svg?style=flat-square">
</a>
<a href="https://codecov.io/gh/nuxt-community/auth-module">
    <img alt="" src="https://img.shields.io/codecov/c/github/nuxt-community/auth-module.svg?style=flat-square">
</a>
<br>
<a href="https://npmjs.com/package/@nuxtjs/auth-next">
    <img alt="" src="https://img.shields.io/npm/v/@nuxtjs/auth-next/latest.svg?style=flat-square">
</a>
<a href="https://npmjs.com/package/@nuxtjs/auth">
    <img alt="" src="https://img.shields.io/npm/dt/@nuxtjs/auth-next.svg?style=flat-square">
</a>
</p>

<p align="center">
<a href="https://auth.nuxtjs.org">Read Documentation</a>
</p>

**🚧 please see [status page](http://auth.nuxtjs.org/status) in documentation.**

## Development

Running demo for development:

```bash
$ yarn install
$ yarn dev
```

Running tests for development:

```bash
$ yarn build
$ yarn nuxt build test/fixture
$ yarn jest
```

## License

[MIT License](./LICENSE) - Copyright (c) Nuxt Community
