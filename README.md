# Snyk Apps Demo


This is a demo app that can be used as a guide on how to create Snyk Apps. This repository contains a simple implementation of a Snyk App written in [Typescript](https://www.typescriptlang.org/), [NodeJS](https://nodejs.org/en/) and [EJS](https://ejs.co/). 

## Important Note

As mentioned above this demo Snyk App has been written in [Typescript](https://www.typescriptlang.org/), [NodeJS](https://nodejs.org/en/) and [EJS](https://ejs.co/), but developers can use any preferred language or framework of their choice to create a Snyk App. 

Also important to mention that we are using [passportjs](https://www.passportjs.org/) for the authentication process with our very own passport strategy [@snyk/passport-snyk-oauth2](https://www.npmjs.com/package/@snyk/passport-snyk-oauth2). Developers can use any available `oauth2` client of their choice or write the authentication code from scratch following our [Snyk Apps Docs](https://docs.snyk.io/features/integrations/snyk-apps).

## Requirements:

- `node` version 10 or greater
- `npm` version 6 or greater


## Getting started:


- Clone the repo `$ git clone https://github.com/snyk/snyk-apps-demo`
- Install all the required dependencies: `$ npm ci` or `npm install`


## Create a new Snyk App:


The first thing you need to do is create an app. If you haven't already created a Snyk App, you can do so via our create script:

```shell
$ npm run create-app -- --authToken=$token --orgId=$id --scopes=$scopes --name="$name"
```

Ex:
```shell
$ npm run create-app -- --authToken=some-token --orgId=some-snyk-org-id --scopes=org.read org.project.read org.project.snapshot.read --name=test-snyk-app
```

or with `redirectUris`

```shell
$ npm run create-app -- --authToken=some-token --orgId=some-snyk-org-id --redirect-uris=https://your-domain/callback --scopes=org.read org.project.read org.project.snapshot.read --name=test-snyk-app
```

(note the extra `--` between `create-app` and the parameters)

- `authToken`(**Required**/**String**): your personal Snyk auth token, obtained from [your account settings page](https://app.snyk.io/account)
- `orgId` (**Required**/**String**): the organization id that you want to own the Snyk App (obtained by clicking the cog in the upper right corner of the Snyk console)
- `redirectUris` (**Optional**/**String Array**): a space separated list of redirect uris for your app, defaults to `http://localhost:3000/callback` when no input provided
- `scopes` (**Required**/**String Array**): a space separated list of scopes you want your App to be able to request at install time (see [Snyk Apps: Requesting scopes](https://docs.snyk.io/snyk-apps/getting-started-with-snyk-apps/create-an-app-via-the-api#requesting-scopes) for allowed values)
- `name` (**Required**/**String**): the friendly name of your Snyk App

This will register your new app with Snyk and create the `.env` file (see below) with your new `CLIENT_ID`, `CLIENT_SECRET`, `REDIRECT_URI`, `SCOPES` and `ENCRYPTION_SECRET`. Keep these values secure!

- `CLIENT_ID`: the client id associated with your Snyk App
- `CLIENT_SECRET`: super secret client secret associated with your Snyk App
- `REDIRECT_URI`: the redirect uri used by your Snyk App
- `SCOPES`: the space-separated list of scopes for your Snyk App
- `ENCRYPTION_SECRET`: secret encryption key used by the demo app to encrypt sensitive data


## Running the Demo Snyk App:


1. Run the following command to compile TypeScript into JavaScript

    ```
    $ npm run build
    ```

2. Once the TypeScript has been compiled to JavaScript(into `./dist` directory) run

    ```
    $ npm run dev
    ```

3. Go to [localhost:3000](http://localhost:3000) to confirm that the app is running successfully


## The .env File:

The `.env` file is used to store environmental variables. Ensure this remains secret! If you've already created a Snyk App, you can copy `.env.example` and set the values.
