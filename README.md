# raterabbit.com

> RateRabbit web app front-end

## Install

##### Note: we have switched to using Yarn for dependency installation et al.

Clone or download the repository to your server or localhost
``` bash
$ git clone git@github.com:brentdexayers/RateRabbit-POC.git
```

Navigate to the app directory
``` bash
$ cd RateRabbit-POC
```

Install dependencies
``` bash
$ yarn install
```

Create `.env` file(s) for your environments and add connection information
``` bash
$ cp .env.sample .env.development
$ nano .env.development
```
You can use `.env.development` and `.env.staging` and `.env.production` files for different environments (see build step below)

Serve with hot reload at localhost:3000
``` bash
$ yarn dev
```

Build for deployment
``` bash
# build for production
$ yarn build

# build for staging
$ yarn build:staging

# build for development
$ yarn build:development
```

After building for your intended environment, commit/push `/dist` files and upload to server.
``` bash
$ git add . && git commit -m "you build comments"
$ git push origin master
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
