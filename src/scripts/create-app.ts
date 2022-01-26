import yargs from 'yargs/yargs';
import { debug } from 'debug';
import { resolve } from 'path';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import fs from 'fs';
import { API_BASE } from '../app';
import * as yaml from 'js-yaml';

const logger = debug('create:app');

interface ApplicationFileData {
  application: {
    name: string;
    'org-id': string;
    'redirect-uris': string[];
    scopes: string[];
  };
}

interface Args {
  authToken: string;
  file?: string;
  orgId?: string;
  redirectUris?: string[];
  scopes?: string[];
  name?: string;
}

interface ApplicationCreateData {
  name: string;
  orgId: string;
  redirectUris: string[];
  scopes: string[];
  authToken: string;
}

interface ApplicationCreateData {
  name: string;
  orgId: string;
  redirectUris: string[];
  scopes: string[];
  authToken: string;
}

interface APIResult<T> {
  data: {
    data: {
      attributes: T;
    };
  };
}

interface CreatedApp {
  clientId: string;
  clientSecret: string;
  redirectUris: string[];
  scopes: string;
}

/**
 * Function to create app via an API call
 * @param appData required data to create the app
 * @returns promise with API call results
 */
export async function createApp(appData: ApplicationCreateData): Promise<APIResult<CreatedApp>> {
  logger('create app data: ', { ...appData, authToken: '*****' });
  return axios({
    method: 'POST',
    url: `${API_BASE}/v3/orgs/${appData.orgId}/apps?version=2021-08-11~experimental`,
    data: {
      redirectUris: appData.redirectUris || ['http://localhost:3000/callback'],
      scopes: appData.scopes,
      name: appData.name,
    },
    headers: {
      authorization: `token ${appData.authToken}`,
      'content-type': 'application/vnd.api+json',
    },
  });
}

/**
 * Function to handle the API call results.
 * Saves the created app data to the .env
 * file.
 */
export function handleResult(result: APIResult<CreatedApp>): void {
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

/**
 * Function to read the app yaml file
 * @param {string} filePath to the yaml file with app data
 * @returns the read data from the yam file
 */
function readYaml(filePath: string): ApplicationFileData {
  logger('file path: ', filePath);
  return yaml.load(fs.readFileSync(filePath, 'utf-8')) as ApplicationFileData;
}

function getAppDataFromFile(args: Args): ApplicationCreateData {
  if (!args.file) throw new Error('File argmumet --file required if using a file to create Snyk App');
  // Use the data picked from the file
  const filePath = resolve(args.file);
  const readData = readYaml(filePath);
  return {
    authToken: args.authToken,
    orgId: readData.application['org-id'],
    redirectUris: readData.application['redirect-uris'] || ['http://localhost:3000/callback'],
    scopes: readData.application.scopes,
    name: readData.application.name,
  };
}

function getAppDataFromArgs(args: Args): ApplicationCreateData {
  if (!args.orgId || !args.redirectUris || !args.scopes || !args.name) {
    throw new Error(
      'Arguments --auth-token, --org-id, --redirect-uris, --scopes, --name, are all required if using the command without the --file argument',
    );
  }
  return {
    authToken: args.authToken,
    orgId: args.orgId,
    redirectUris: args.redirectUris as string[],
    scopes: args.scopes as string[],
    name: args.name,
  };
}

(async () => {
  try {
    const args = (await yargs(process.argv.slice(2)).options({
      authToken: { type: 'string', demandOption: true },
      file: { type: 'string', demandOption: false },
      orgId: { type: 'string', demandOption: false },
      redirectUris: { type: 'array', demandOption: false },
      scopes: { type: 'array', demandOption: false },
      name: { type: 'string', demandOption: false },
    }).argv) as Args;

    const appData = args.file ? getAppDataFromFile(args) : getAppDataFromArgs(args);
    const result = await createApp(appData);
    handleResult(result);
  } catch (err: any) {
    logger('error: ', err);
    const errMessage = err.response ? err.response.data : err.message;
    console.log(`Error creating app: \n\n${JSON.stringify(errMessage)}`);
  }
})();
