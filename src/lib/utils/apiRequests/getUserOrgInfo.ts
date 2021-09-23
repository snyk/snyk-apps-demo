import axios from 'axios';
import { API_BASE, APP_BASE } from '../../../app';

export async function getUserOrgInfo(access_token: string, token_type: string): Promise<any> {
  try {
    const result = await axios({
      method: 'GET',
      url: `${API_BASE}/v1/user/me`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token_type} ${access_token}`,
      },
    });

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
