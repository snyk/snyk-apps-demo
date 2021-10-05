# Snyk Apps Demo


This is a demo app that can be used as a guide on how to create Snyk Apps. This repository contains a simple implementation of a Snyk App written in [Typescript](https://www.typescriptlang.org/), [NodeJS](https://nodejs.org/en/) and [EJS](https://ejs.co/). Developers can use their preffered language or framework to create
a Snyk App.


## Requirements:

- `node` version 10 or greater
- `npm` version 6 or greater


## Getting started:


- Clone the repo `$ git clone https://github.com/snyk/snyk-apps-demo`
- Install all the required dependencies: `$ npm ci` or `npm install`


## Create a new Snyk App:


The first thing you need to do is create an app. If you haven't already created a Snyk App, you can do so via our create script:

`$ npm run create-app -- --authToken=$token --orgId=$id --scopes=$scopes --name="$name"`

Ex:
`$ npm run create-app -- --authToken=some-token --orgId=some-snyk-org-id --scopes=apps:beta --name=test-snyk-app`

or with `redirectUris`

`$ npm run create-app -- --authToken=some-token --orgId=some-snyk-org-id --redirect-uris=https://your-domain/callback --scopes=apps:beta --name=test-snyk-app`

(note the extra `--` between `create-app` and the parameters)

- `authToken`(**Required**/**String**): your personal Snyk auth token, obtained from [your account settings page](https://app.snyk.io/account)
- `orgId` (**Required**/**String**): the organization id that you want to own the Snyk App (obtained by clicking the cog in the upper right corner of the Snyk console)
- `redirectUris` (**Optional**/**String Array**): a space separated list of redirect uris for your app, defaults to `http://localhost:3000/callback` when no input provided
- `scopes` (**Required**/**String Array**): a space separated list of scopes you want your App to be able to request at install time (see [Snyk Apps docs](https://docs.snyk.io/integrations/snyk-apps) for allowed values)
- `name` (**Required**/**String**): the friendly name of your Snyk App

This will register your new app with Snyk and create the `.env` file (see below) with your new `CLIENT_ID`, `CLIENT_SECRET`, `REDIRECT_URI`, `SCOPES` and `ENCRYPTION_SECRET`. Keep these values secure!

- `CLIENT_ID`: the client id associated with your Snyk App
- `CLIENT_SECRET`: super secret client secret associated with your Snyk App
- `REDIRECT_URI`: the redirect uri used by your Snyk App
- `SCOPES`: the space-separated list of scopes for your Snyk App
- `ENCRYPTION_SECRET`: secret encryption key used by the demo app to encrypt sensitive data


## Running the Demo Snyk App:


1. Run the following command to compile TypeScript into JavaScript

    `$ npm run build`

2. Once the TypeScript has been compiled to JavaScript(into `./dist` directory) run

    `$ npm run dev` or in watch mode `$ npm run dev:watch`

3. Go to [localhost:3000](http://localhost:3000) to confirm that the app is running successfully


## The .env File:

The `.env` file is used to store environmental variables. Ensure this remains secret! If you've already created a Snyk App, you can copy `.env.example` and set the values.
