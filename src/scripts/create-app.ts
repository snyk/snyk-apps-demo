import yargs from 'yargs/yargs';
import axios from 'axios';
import fs from 'fs';
import { API_BASE } from '../app';
import { v4 as uuidv4 } from 'uuid';
import { debug } from 'debug';

const logger = debug('create-app-script');

type Args = {
  authToken: string;
  orgId: string;
  redirectUris?: string[];
  scopes: string[];
  name: string;
};
type APIResult<T> = {
  data: {
    data: {
      attributes: T;
    };
  };
};
type CreatedApp = {
  clientId: string;
  clientSecret: string;
  redirectUris: string[];
  scopes: string;
};

const args = yargs(process.argv.slice(2)).options({
  authToken: { type: 'string', demandOption: true },
  orgId: { type: 'string', demandOption: true },
  redirectUris: { type: 'array', demandOption: false },
  scopes: { type: 'array', demandOption: true },
  name: { type: 'string', demandOption: true },
}).argv as Args;

async function createApp(args: Args) {
  logger('arguments passed: ', { args });
  return axios({
    method: 'POST',
    url: `${API_BASE}/v3/orgs/${args.orgId}/apps?version=2021-08-11~experimental`,
    data: {
      redirectUris: args.redirectUris || ['http://localhost:3000/callback'],
      scopes: args.scopes,
      name: args.name,
    },
    headers: {
      authorization: `token ${args.authToken}`,
      'content-type': 'application/vnd.api+json',
    },
  });
}

function handleResult(result: APIResult<CreatedApp>) {
  logger('results: ', result);
  const { clientId, clientSecret, redirectUris, scopes } = result.data.data.attributes;
  const envContent = `CLIENT_ID=${clientId}
CLIENT_SECRET=${clientSecret}
REDIRECT_URI=${redirectUris.join(',')}
SCOPES=${scopes}
ENCRYPTION_SECRET=${uuidv4()}`;

  fs.writeFileSync('.env', envContent);

  console.log(
    'Congratulations, you have a new App setup and ready to develop! Your client-id & client-secret have already been set in .env, which should stay secret and out of git. Enjoy!',
  );
}

createApp(args)
  .then(handleResult)
  .catch((err) => {
    logger('error: ', err);
    console.log(`Error creating app: "${err}", details: "${JSON.stringify(err.response.data)}"`);
  });
