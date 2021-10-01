import { readFromDb } from '../../utils/db';
import { callSnykApi } from '../../utils/api';
import { EncryptDecrypt } from '../../utils/encrypt-decrypt';
import { AuthData, Envars } from '../../types';

/**
 * Get projects handler that fetches all user projects
 * from the Snyk API using user access token. This for
 * example purposes. In production it will depend on your
 * token scopes on what you can and can not access
 * @returns List of user project or an empty array
 */
export async function getProjectsFromApi(): Promise<unknown[]> {
  // Read data from DB
  const db = await readFromDb();
  const data = mostRecent(db.installs);
  // If no data return empty array
  if (!data) return [];

  // Decrypt data(access token)
  const eD = new EncryptDecrypt(process.env[Envars.EncryptionSecret] as string);
  const access_token = eD.decryptString(data?.access_token);
  const token_type = data?.token_type;
  // Call the axios instance configured for Snyk API v1
  const result = await callSnykApi(access_token, token_type).post(`/org/${data?.orgId}/projects`);

  return result.data.projects || [];
}

/**
 *
 * @param {AuthData[]} installs get most recent install from list of installs
 * @returns the latest install or void
 */
export function mostRecent(installs: AuthData[]): AuthData | void {
  if (installs) {
    return installs[installs.length - 1];
  }
  return;
}
