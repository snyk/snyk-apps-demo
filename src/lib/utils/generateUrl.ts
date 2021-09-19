import * as crypto from 'crypto';
import qs from 'qs';
import { APP_BASE } from '../../app';

export function generateUrl(): string {
  const params = {
    client_id: process.env.CLIENT_ID,
    response_type: 'code',
    redirect_uri: process.env.REDIRECT_URI,
    scope: process.env.SCOPES,
    nonce: crypto.randomBytes(16).toString('base64'),
    state: crypto.randomBytes(16).toString('base64'),
  };

  return `${APP_BASE}/apps/oauth2/authorize?${qs.stringify(params)}`;
}
