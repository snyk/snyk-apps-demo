# Snyk Demo App


This is a demo app that can be used as a guide on how to create Snyk Apps. Created in NodeJS with TypeScript and EJS templates provides a simple implementation.


## Requirements:


- `node` version 10 or greater
- `npm` verion 6 or greater
- Install all the dependencies using `$ npm install or npm ci`

## Create new Snyk App:


The first thing you need to do is create an app. If you haven't already created a Snyk App, you can do so via:

`$ npm run create-app -- --authToken=$token --orgId=$id --scopes=$scopes --name="$name"`

Ex:
`$ npm run create-app -- --authToken=some-token --orgId=some-snyk-org-id --scopes=apps:beta offline --name=test-snyk-app`

(note the extra `--` between `create-app` and the parameters)

- `authToken`: your personal Snyk auth token, obtained from [your account settings page](https://app.snyk.io/account)
- `orgId`: the organization id that you want to own the Snyk App (obtained by clicking the cog in the upper right corner of the Snyk console)
- `scopes`: a space separated list of scopes you want your App to be able to request at install time (see Snyk Apps docs for allowed values)
- `name`: the friendly name of your Snyk App

This will register your new app with Snyk and create the `.env` file (see below) with your new `client-id`, `client-secret`, `redirect-uri`, `scopes` and `encryption-key`. Keep these values secure!

- `client-id` or `CLIENT_ID`: the client id associated with your Snyk app
- `client-secret` or `CLIENT_SECRET`: super secret client secret associated with you Snyk app
- `redirect-uri` or `REDIRECT_URI`: the redirect uri or the callback url used by your Snyk app
- `scopes` or `SCOPES`: the space separated list of scopes for your Snyk app
- `encryption-key` or `ENCRYPTION_KEY`: secret encryption key used by the demo app to encrypt sensitive data


## Running the Demo Snyk App:


1. Run the following command to compile TypeScript into JavaScript

    `$ npm run build`

2. Once the TypeScript has been compiled to JavaScript(into `./dist` directory) run

    `$ npm run dev` or in the watch mode `$ npm run dev:watch`


## The .env File:


The `.env` file is used to store all the environmental variables. Ensure this remains secret! If you've already created a Snyk App, you can copy `.env.example` and set the values.
