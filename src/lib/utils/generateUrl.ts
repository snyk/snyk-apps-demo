import * as crypto from 'crypto';

export function generateUrl(): string {
  const clientId = process.env.CLIENT_ID;
  const redirectURI = process.env.REDIRECT_URI;
  const scopes = process.env.SCOPES;
  const nonce = crypto.randomBytes(16).toString('base64');
  const state = crypto.randomBytes(16).toString('base64');
  return `http://localhost:8000/apps/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectURI}&response_type=code&scope=${scopes}&nonce=${nonce}&state=${state}`;
}
