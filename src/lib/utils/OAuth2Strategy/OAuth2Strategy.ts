import type { Request } from 'express';
import OAuth2Strategy from 'passport-oauth2';
import { writeToDb } from '../db';
import { EncryptDecrypt } from '../encrypt-decrypt';
import { Envars, AuthData, Config } from '../../types';
import { API_BASE, APP_BASE } from '../../../app';
import { getUserOrgInfo } from '../apiRequests';
import config from 'config';
import jwt_decode from 'jwt-decode';

export function getOAuth2(nonce: string) {
  const clientID = process.env[Envars.ClientId] as string;
  const clientSecret = process.env[Envars.ClientSecret] as string;
  const callbackURL = process.env[Envars.RedirectUri] as string;
  const scopeFromEnv = process.env[Envars.Scopes] as string;
  const scope = scopeFromEnv.split(',');

  return new OAuth2Strategy(
    {
      authorizationURL: `${APP_BASE}${config.get(Config.AuthURL)}?nonce=${nonce}`,
      tokenURL: `${API_BASE}${config.get(Config.TokenURL)}`,
      clientID,
      clientSecret,
      callbackURL,
      scope,
      scopeSeparator: ' ',
      state: true,
      passReqToCallback: true,
    },
    async function (req: Request, access_token: string, refresh_token: string, params: any, profile: any, done: any) {
      try {
        const decoded: any = jwt_decode(access_token);
        if (nonce !== decoded.nonce) throw new Error('Nonce values do not match');
        const { expires_in, scope, token_type } = params;
        const { orgId, orgName } = await getUserOrgInfo(access_token, token_type);
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
          nonce,
        } as AuthData);
      } catch (error) {
        return done(error, false);
      }
      return done(null, { nonce });
    },
  );
}
