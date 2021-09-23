import { readFromDb } from '../../utils/db';
import axios from 'axios';
import { API_BASE } from '../../../app';
import { EncryptDecrypt } from '../../utils/encrypt-decrypt';
import { AuthData, Envars } from '../../types';

export async function getProjectsFromApi() {
  try {
    const db = await readFromDb();
    const data = mostRecent(db.installs);
    if (!data) return [];

    // Decrypt data
    const eD = new EncryptDecrypt(process.env[Envars.EncryptionSecret] as string);
    const access_token = eD.decryptString(data?.access_token);
    const token_type = data?.token_type;

    const result = await axios({
      method: 'POST',
      url: `${API_BASE}/v1/org/${data?.orgId}/projects`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token_type} ${access_token}`,
      },
    });
    return result.data.projects || [];
  } catch (error) {
    throw error;
  }
}

function mostRecent(installs: AuthData[]): AuthData | void {
  if (installs) {
    return installs[installs.length - 1];
  }
  return;
}
