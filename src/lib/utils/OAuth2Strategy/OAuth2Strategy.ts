import OAuth2Strategy from 'passport-oauth2';
import type { Request } from 'express';
import { writeToDb } from '../db';
import { EncryptDecrypt } from '../encrypt-decrypt';
import { Envars, AuthData } from '../../types';
import axios from 'axios';
import { API_BASE } from '../../../app';

interface GetOAuthParams {
  authorizationURL: string;
  tokenURL: string;
  clientID: string;
  clientSecret: string;
  callbackURL: string;
  scope: string;
  state: any;
  nonce: any;
}

export function getOAuth2(params: GetOAuthParams) {
  const { authorizationURL, tokenURL, clientID, clientSecret, callbackURL, scope, state, nonce } = params;
  return new OAuth2Strategy(
    {
      authorizationURL: `${authorizationURL}?nonce=${nonce}`,
      tokenURL,
      clientID,
      clientSecret,
      callbackURL,
      scope,
      state,
      passReqToCallback: true,
    },
    async function (req: Request, access_token: string, refresh_token: string, params: any, profile: any, done: any) {
      // TODO: params has expires_in, scope, token_type
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
        return done(error, profile);
      }
      return done(null, profile);
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
