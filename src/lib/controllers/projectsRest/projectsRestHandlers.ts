import { callSnykRestApi } from '../../utils/api';
import { EncryptDecrypt } from '../../utils/encrypt-decrypt';
import { getMostRecentInstall } from '../../utils/authData/getMostRecent';
import { APIVersion, Envars, Project, ProjectData, ProjectsResponse } from '../../types';

/**
 * Get projects handler that fetches all user projects
 * from the Snyk API using user access token. This for
 * example purposes. In production it will depend on your
 * token scopes on what you can and can not access
 * @returns List of user project or an empty array
 */
export async function getProjectsFromRestApi(): Promise<ProjectsResponse[]> {
  // Read data from DB
  const data = await getMostRecentInstall();
  // If no data return empty array
  if (!data) return [];

  // Decrypt data(access token)
  const eD = new EncryptDecrypt(process.env[Envars.EncryptionSecret] as string);
  const access_token = eD.decryptString(data?.access_token);
  const token_type = data?.token_type;

  // Call the axios instance configured for Snyk API REST
  const requests = (data?.orgs ?? []).map((org) =>
    callSnykRestApi(token_type, access_token)
      .get(`/orgs/${org.id}/projects?version=${APIVersion.V20230529}&limit=100`)
      .then((response) => {
        const projectData: ProjectData[] = response.data.data.map((project: Project) => ({
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
