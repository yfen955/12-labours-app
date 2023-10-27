# 12-labours-app

## Environment variables

Here is the list of environment variables used by the app. After cloning the repository, please create a file named `.env` in the root directory and paste the variables.
```bash
#This is the base url
PORTAL_URL=
#This is the api url of FastAPI backend
QUERY_API_URL=
#This should point to the login system, the default value is http://localhost:8080
LOGIN_API_URL=
#An API Key to protect the server, this variable is required and should be the same when starting the api and app server
LOGIN_API_KEY=
# This is the api key for encryption
LOGIN_SECRET_KEY=
#Endpoint to the GraphCMS
GRAPHCMS_ENDPOINT=
#The client id for Google OAuth. They are provided from the Credentials setup on Google Cloud
GOOGLE_CLIENT_ID=
#Location of the xml educational material for 12 Labours
TWELVE_LABOURS_XML=
#This is the client number for google analytics, this is not essential
GOOGLE_ANALYTICS_GA4=
#This is the API for the flatmap
FLATMAP_API=
```

## Development tools

Before setup the project, please install the Node.js and Yarn (package manager). Here are recommended versions: 

Node.js: `14.17.6`

Yarn: `1.22.19`

## Build Setup

Please run the first command to install the dependencies, then run the second command to open the portal.

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## End-to-end Testing

This repo is set up to run testing automatically when there are any commits in GitHub. You can see all testing results on the `Actions` page and [Cypress Cloud](https://cloud.cypress.io/projects/zadmv6/runs?branches=%5B%5D&committers=%5B%5D&flaky=%5B%5D&page=1&status=%5B%5D&tags=%5B%5D&timeRange=%7B%22startDate%22%3A%221970-01-01%22%2C%22endDate%22%3A%222038-01-19%22%7D).

To run the testing manually, please run this command: `yarn cypress open`. Then click on `E2E Testing` and select any browser you prefer. Finally choose the testing you want to run.

## Special Directories

You can create the following extra directories, some of which have special behaviours. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).


### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `services`

The services directory contains JavaScript files with functions connect to APIs.

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).
