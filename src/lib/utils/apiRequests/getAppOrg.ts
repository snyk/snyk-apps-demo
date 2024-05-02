import { APIVersion, Org } from '../../types';
import { callSnykApi } from '../api';

interface V1ApiOrg {
  id: string;
  name: string;
}

/**
 * Function to get app's accessible Snyk Org IDs, which are used in other API requests
 * @param {String} tokenType token type which is normally going to be bearer
 * @param {String} accessToken access token fetched on users behalf
 * @returns Org data or throws and error
 */
export async function getAppOrgs(tokenType: string, accessToken: string): Promise<{ orgs: Org[] }> {
  try {
    const result = await callSnykApi(
      tokenType,
      accessToken,
    )({
      method: 'GET',
      url: `/orgs?version=${APIVersion.V20231103}`,
    });

    return {
      // Use v1 until rest endpoint supports indirect org access
      //orgs: result.data.data.map((org: RestApiOrg) => ({ id: org.id, name: org.attributes.name })),
      orgs: result.data.orgs.map((org: V1ApiOrg) => ({ id: org.id, name: org.name })),
    };
  } catch (error) {
    console.error('Error fetching org info: ' + error);
    throw error;
  }
}
