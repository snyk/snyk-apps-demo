import { readFromDb } from '../../utils/db';
import { callSnykRestApi } from '../../utils/api';
import { EncryptDecrypt } from '../../utils/encrypt-decrypt';
import { APIVersion, AuthData, Envars, Project } from '../../types';

/**
 * Get projects handler that fetches all user projects
 * from the Snyk API using user access token. This for
 * example purposes. In production it will depend on your
 * token scopes on what you can and can not access
 * @returns List of user project or an empty array
 */
export async function getProjRestFromApi(): Promise<unknown[]> {
  // Read data from DB
  const db = await readFromDb();
  const data = mostRecent(db.installs);
  // If no data return empty array
  if (!data) return [];

  // Decrypt data(access token)
  const eD = new EncryptDecrypt(process.env[Envars.EncryptionSecret] as string);
  const access_token = eD.decryptString(data?.access_token);
  const token_type = data?.token_type;

  // Call the axios instance configured for Snyk API REST
  // Recheck - mn

  const requests = (data?.orgs ?? []).map((org) =>
    callSnykRestApi(token_type, access_token, APIVersion.REST)
      .get(`/orgs/${org.id}/projects?version=2023-05-29&limit=100`)
      .then((response) => {
        const projectData: Array<{
          id: string;
          name: string;
          type: string;
          origin: string;
        }> = response.data.data.map((project: Project) => ({
          id: project.id,
          name: project.attributes.name,
          type: project.attributes.type,
          origin: project.attributes.origin,
        }));
        return {
          projects: projectData || [],
        };
      }),
  );
  return Promise.all(requests);
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
