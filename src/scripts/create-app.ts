import yargs from 'yargs/yargs';
import axios from 'axios';
import fs from 'fs';

const args = yargs(process.argv.slice(2)).options({
  authToken: { type: 'string', demandOption: true },
  orgId: { type: 'string', demandOption: true },
  scopes: { type: 'string', demandOption: true },
  name: { type: 'string', demandOption: true },
}).argv;

async function createApp(args: any) {
  return axios({
    method: 'POST',
    url: `http://api.snyk.local/v3/orgs/${args.orgId}/apps?version=2021-08-11~experimental`,
    data: {
      redirectUris: ['http://localhost:3000/callback'],
      scopes: args.scopes.split(','),
      name: args.name,
    },
    headers: {
      'authorization': `token ${args.authToken}`,
      'content-type': 'application/vnd.api+json',
    },
  });
}

function handleResult(result: any) {
  const { clientId, clientSecret, redirectUris, scopes } = result.data.data.attributes;
  const envContent =
`CLIENT_ID=${clientId}
CLIENT_SECRET=${clientSecret}
REDIRECT_URI=${redirectUris.join(',')}
SCOPES=${scopes.join(',')}`

  fs.writeFileSync('.env', envContent);

  console.log("Congratulations, you have a new App setup and ready to develop! Your client-id & client-secret have already been set in .env, which should stay secret and out of git. Enjoy!")
}

createApp(args).then(handleResult);
