## Snyk Demo App

This is a demo app that can be used as a guide on how to create Snyk Apps. Created in NodeJS with TypeScript and EJS provides a simple implementation.

### Start the App

Install all the dependencies using `npm`:

`$ npm install`

### With TS Node

TS Node enables you to run the app in TypeScript without having to compile the application to JavaScript.

`$ ts-node src/index.ts` or use script `$ npm run dev`

To run the app in watch mode using `nodemon`, you can use `$ npm run dev:watch`

You will see a message similar to: `App listening on port: 3000`

Test to confirm, go to: http://localhost:3000/example and you should see a Hello World message.

### .env File

The `.env` file is used to store all the environmental variables

To create one from the example file run

`$ cp ./.env.example ./.env`

Example contents of the file:

```
PORT=3000
CLIENT_ID=
CLIENT_SECRET=
REDIRECT_URI=
SCOPES=
```
