import OAuth2Strategy from 'passport-oauth2';
import type { Request } from 'express';
import { writeToDb } from '../db';
import { EncryptDecrypt } from '../encrypt-decrypt';
import { Envars, AuthData } from '../../types';
import axios from 'axios';
import { API_BASE, APP_BASE } from '../../../app';

interface GetOAuthParams {
  state: any;
  nonce: any;
}

export function getOAuth2(params: GetOAuthParams) {
  const clientID = process.env[Envars.ClientId] as string;
  const clientSecret = process.env[Envars.ClientSecret] as string;
  const callbackURL = process.env[Envars.RedirectUri] as string;
  const scopeFromEnv = process.env[Envars.Scopes] as string;
  const scope = scopeFromEnv.split(',');
  const { state, nonce } = params;

  return new OAuth2Strategy(
    {
      authorizationURL: `${APP_BASE}/apps/oauth2/authorize?nonce=${nonce}`,
      tokenURL: `${API_BASE}/v3/apps/oauth2/token`,
      clientID,
      clientSecret,
      callbackURL,
      scope,
      scopeSeparator: ' ',
      state,
      passReqToCallback: true,
    },
    async function (req: Request, access_token: string, refresh_token: string, params: any, profile: any, done: any) {
      try {
        const { expires_in, scope, token_type } = params;
        const { orgId, orgName } = await getOrgInfo(access_token, token_type);
        const ed = new EncryptDecrypt(process.env[Envars.EncryptionSecret] as string);
        await writeToDb({
          date: new Date(),
          orgId,
          orgName,
          access_token: ed.encryptString(access_token),
          expires_in,
          scope,
          token_type,
          refresh_token: ed.encryptString(refresh_token),
        } as AuthData);
      } catch (error) {
        return done(error, null);
      }
      return done(null, { nonce, state });
    },
  );
}

async function getOrgInfo(access_token: string, token_type: string): Promise<any> {
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
