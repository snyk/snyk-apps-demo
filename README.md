## Snyk Demo App

This is a demo app that can be used as a guide on how to create Snyk Apps. Created in NodeJS with TypeScript and EJS provides a simple implementation.

### Create new SnykApp

If you haven't already created a Snyk App, you can do so via:

`$ npm run create-app -- --authToken=$token --orgId=$id --scopes=$scopes --name="$name"`

Ex: `npm run create-app -- --authToken=some-token --orgId=some-snyk-org-id --scopes="photos" "offline" --name="test-snyk-app"`

(note the extra `--` between `create-app` and the parameters)

- `authToken`: your personal Snyk auth token, obtained from [your account settings page](https://app.snyk.io/account)
- `orgId`: the organization id that you want to own the Snyk App (obtained by clicking the cog in the upper right corner of the Snyk console)
- `scopes`: a space separated list of scopes you want your App to be able to request at install time (see Snyk Apps docs for allowed values)
- `name`: the friendly name of your Snyk App

This will register your new app with Snyk and create the `.env` file (see below) with your new client-id & client-secret. Keep these values secure!

### Start the App

Install all the dependencies using `npm`:

`$ npm install`

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
