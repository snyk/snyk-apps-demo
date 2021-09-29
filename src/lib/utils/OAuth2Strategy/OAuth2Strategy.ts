import type { Request } from 'express';
import OAuth2Strategy from 'passport-oauth2';
import { writeToDb } from '../db';
import { EncryptDecrypt } from '../encrypt-decrypt';
import { Envars, AuthData, Config } from '../../types';
import { API_BASE, APP_BASE } from '../../../app';
import { getUserOrgInfo } from '../apiRequests';
import config from 'config';
import jwt_decode from 'jwt-decode';

/**
 * Generating the passport strategy is the first step in setting up passportjs
 * @param {String} nonce is required by Snyk Apps authorization flow. Nonce is
 * encoded in the token returned. You can read more about it in the RFC:
 * https://datatracker.ietf.org/doc/html/rfc6749#section-7.1
 *
 * Please note: Passportjs OAuth2 strategy does not support nonce at the
 * moment. So we are verifying the nonce value manually in this application
 * @returns Passport strategy for OAuth2
 */
export function getOAuth2(nonce: string) {
  /**
   * All the required values are read from environmental variables
   * as these values are to be kept confidential
   * 1. clientID: The client of the Snyk app you created
   * 2. clientSecret: The client secret of the the Snyk app you created
   * 3. callbackURL: The callback URL for your Snyk app
   * 4. scope: The scope of your Snyk app
   */
  const clientID = process.env[Envars.ClientId] as string;
  const clientSecret = process.env[Envars.ClientSecret] as string;
  const callbackURL = process.env[Envars.RedirectUri] as string;
  const scope = process.env[Envars.Scopes] as string;

  // Note version and nonce values manually being added to the authorization URL
  return new OAuth2Strategy(
    {
      authorizationURL: `${APP_BASE}${config.get(Config.AuthURL)}?version=2021-08-11~experimental&nonce=${nonce}`,
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
