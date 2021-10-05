# Snyk Apps Demo


This is a demo app that can be used as a guide on how to create Snyk Apps. Created in NodeJS with TypeScript and EJS templates and compile to JavaScript. This repository contains a simple implementation of a Snyk App written in [Typescript](https://www.typescriptlang.org/), [NodeJS](https://nodejs.org/en/) and [EJS](https://ejs.co/).


## Requirements:

- `node` version 10 or greater
- `npm` version 6 or greater


## Getting started:


- Clone the repo `$ git clone https://github.com/snyk/snyk-apps-demo`
- Install all the required dependencies: `$ npm ci` or `npm install`


## Create a new Snyk App:


The first thing you need to do is create an app. If you haven't already created a Snyk App, you can do so via:

`$ npm run create-app -- --authToken=$token --orgId=$id --scopes=$scopes --name="$name"`

Ex:
`$ npm run create-app -- --authToken=some-token --orgId=some-snyk-org-id --scopes=apps:beta --name=test-snyk-app`

(note the extra `--` between `create-app` and the parameters)

- `authToken`: your Snyk auth token, obtained from [your account settings page](https://app.snyk.io/account)
- `orgId`: the organization id that you want to own the Snyk App (obtained by clicking the cog in the upper right corner of the Snyk console)
- `scopes`: a space-separated list of scopes you want your App to be able to request at install time (see [Snyk Apps docs](https://docs.snyk.io/features/integrations/snyk-apps/getting-started-with-snyk-apps/create-an-app-via-the-api#available-scopes) for allowed values)
- `name`: the friendly name of your Snyk App. Users will see this name when they authorize the app

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


## The .env File:

The `.env` file is used to store environmental variables. Ensure this remains secret! If you've already created a Snyk App, you can copy `.env.example` and set the values.