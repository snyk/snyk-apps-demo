import { callSnykApi } from '../api';

/**
 * Function to get user's Snyk Org ID and Name that may be used in
 * other API requests
 * @param {String} access_token access token fetched on users behalf
 * @param {String} token_type token type which is normally going to be bearer
 * @returns Org data or throws and error
 */
export async function getUserOrgInfo(access_token: string, token_type: string): Promise<any> {
  try {
    const result = await callSnykApi(
      access_token,
      token_type,
    )({
      method: 'GET',
      url: `/user/me`,
    });
    // Fetch the first org for demo purposes
    const org = result.data.orgs[0];
    return {
      orgId: org.id,
      orgName: org.name,
    };
  } catch (error) {
    console.error('Error fetching org info: ' + error);
    throw error;
  }
}
