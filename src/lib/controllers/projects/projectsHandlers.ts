import { readFromDb } from '../../utils/db';
import axios from 'axios';
import { API_BASE } from '../../../app';
import { EncryptDecrypt } from '../../utils/encrypt-decrypt';
import { AuthData, Envars } from '../../types';

/**
 * Get projects handler that fetches all user projects
 * from the Snyk API using user access token. This for
 * example purposes. In production it will depend on your
 * token scopes on what you can and can not access
 * @returns List of user project or an empty array
 */
export async function getProjectsFromApi() {
  try {
    // Read data from DB
    const db = await readFromDb();
    const data = mostRecent(db.installs);
    // If no data return empty array
    if (!data) return [];

    // Decrypt data(access token)
    const eD = new EncryptDecrypt(process.env[Envars.EncryptionSecret] as string);
    const access_token = eD.decryptString(data?.access_token);
    const token_type = data?.token_type;
    // Call Snyk API to get projects for the user
    const result = await axios({
      method: 'POST',
      url: `${API_BASE}/v1/org/${data?.orgId}/projects`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token_type} ${access_token}`,
      },
    });
    // Return projects array or an empty array
    return result.data.projects || [];
  } catch (error) {
    // Throws error if DB read or API call fails
    throw error;
  }
}

/**
 *
 * @param {AuthData[]} installs get most recent install from list of installs
 * @returns the latest install or void
 */
function mostRecent(installs: AuthData[]): AuthData | void {
  if (installs) {
    return installs[installs.length - 1];
  }
  return;
}
