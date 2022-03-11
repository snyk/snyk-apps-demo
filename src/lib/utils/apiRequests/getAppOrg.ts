import { APIVersion, Org } from '../../types';
import { callSnykApi } from '../api';

interface APIOrg {
  id: string;
  attributes: {
    name: string;
  };
}

/**
 * Function to get app's Snyk Org ID i.e the org the app has access to
 * which is used in other API requests
 * @param {String} access_token access token fetched on users behalf
 * @param {String} token_type token type which is normally going to be bearer
 * @returns Org data or throws and error
 */
export async function getAppOrgs(tokenType: string, accessToken: string): Promise<{ orgs: Org[] }> {
  try {
    const result = await callSnykApi(
      tokenType,
      accessToken,
      APIVersion.REST,
    )({
      method: 'GET',
      url: `/orgs?version=2022-02-16~experimental`,
    });

    // Fetch the first org for demo purposes
    const orgs = result.data.data;
    return {
      orgs: orgs.map((org: APIOrg) => ({ id: org.id, name: org.attributes.name })),
    };
  } catch (error) {
    console.error('Error fetching org info: ' + error);
    throw error;
  }
}
