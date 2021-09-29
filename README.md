## Snyk Demo App

This is a demo app that can be used as a guide on how to create Snyk Apps. Created in NodeJS with TypeScript and EJS templates provides a simple implementation.

### Create new SnykApp

The first thing you need to do is create a app. If you haven't already created a Snyk App, you can do so via:

`$ npm run create-app -- --authToken=$token --orgId=$id --scopes=$scopes --name="$name"`

Ex:
`$ npm run create-app -- --authToken=some-token --orgId=some-snyk-org-id --scopes="photos" "offline" --name="test-snyk-app"`
or
`$ npm run create-app -- --authToken=some-token --orgId=some-snyk-org-id --scopes=photos offline --name=test-snyk-app`

(note the extra `--` between `create-app` and the parameters)

- `authToken`: your personal Snyk auth token, obtained from [your account settings page](https://app.snyk.io/account)
- `orgId`: the organization id that you want to own the Snyk App (obtained by clicking the cog in the upper right corner of the Snyk console)
- `scopes`: a space separated list of scopes you want your App to be able to request at install time (see Snyk Apps docs for allowed values)
- `name`: the friendly name of your Snyk App

This will register your new app with Snyk and create the `.env` file (see below) with your new `client-id`, `client-secret`, `redirect-uri`, `scopes` and `encryption-key`. Keep these values secure!

- `client-id` or `CLIENT_ID`: the client id associated with your Snyk app
- `client-secret` or `CLIENT_SECRET`: super secret client secret associated with you Snyk app
- `redirect-uri` or `REDIRECT_URI`: the redirect uri or the callback url used by your Snyk app
- `scopes` or `SCOPES`: the scopes for your Snyk app
- `encryption-key` or `ENCRYPTION_KEY`: secret encryption key used by the demo app to encrypt sensitive data

### Start the App

Install all the dependencies using `npm`:

`$ npm install` or `$ npm ci`

### NodeJS and JavaScript

Run the following command to compile TypeScript into JavaScript

`$ npm run build`

Once the TypeScript has been compiled to JavaScript(`./dist`) run

`$ npm run dev:js`

or in the watch mode

`$ npm run dev:js-watch`

### With TS Node

TS Node enables you to run the app in TypeScript without having to compile the application to JavaScript.

`$ ts-node src/index.ts` or use script `$ npm run dev`

To run the app in watch mode using `nodemon`, you can use `$ npm run dev:watch`

You will see a message similar to: `App listening on port: 3000`

Test to confirm, go to: [http://localhost:3000](http://localhost:3000).

### .env File

The `.env` file is used to store all the environmental variables. Ensure this remains secret!

If you've already created a Snyk App, you can copy `.env.example` and set the values.

### Overriding the default API URLs

The defaults for the required API URLs are in the `./config/default.json` file. To override this you can create an
environment specific file. For example create a file `./config/development.json` and override the values you want to.
Now when `NODE_ENV` is set to `development` overrided values from `./config/development.json` will be used instead.

You can do the same for any other environment such as `production` or even map variables to environment variables.
Read more about it [node-config](https://github.com/lorenwest/node-config/wiki/Environment-Variables).
