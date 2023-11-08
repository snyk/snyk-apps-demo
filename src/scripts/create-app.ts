import yargs from 'yargs/yargs';
import axios from 'axios';
import fs from 'fs';
import { API_BASE } from '../app';
import { APIVersion } from '../lib/types';
import { v4 as uuidv4 } from 'uuid';

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
  client_id: string;
  client_secret: string;
  redirect_uris: string[];
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
  return axios({
    method: 'POST',
    url: `${API_BASE}/rest/orgs/${args.orgId}/apps/creations?version=${APIVersion.V20231103}`,
    data: {
      data: {
        attributes: {
          context: 'tenant',
          name: args.name,
          redirect_uris: args.redirectUris || ['http://localhost:3000/callback'],
          scopes: args.scopes,
        },
        type: 'app',
      },
    },
    headers: {
      authorization: `token ${args.authToken}`,
      'content-type': 'application/vnd.api+json',
    },
  });
}

function handleResult(result: APIResult<CreatedApp>) {
  const {
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uris: redirectUris,
    scopes,
  } = result.data.data.attributes;
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
  .catch((err) => console.log(`Error creating app: "${err}", details: "${JSON.stringify(err.response.data)}"`));
