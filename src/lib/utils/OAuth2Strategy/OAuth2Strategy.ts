import type { Request } from 'express';
import { writeToDb } from '../db';
import { EncryptDecrypt } from '../encrypt-decrypt';
import { AuthData, Config, Envars } from '../../types';
import { API_BASE, APP_BASE } from '../../../app';
import { getAppOrgs } from '../apiRequests';
import config from 'config';
import { AxiosResponse } from 'axios';
import { callSnykApi } from '../api';
import OAuth2Strategy, { VerifyCallback } from 'passport-oauth2';

type Params = {
  expires_in: number;
  scope: string;
  token_type: string;
};

/**
 * We use OAuth2Strategy provided by passport for the authorization
 * process.
 *
 * Please note that the PKCE (https://datatracker.ietf.org/doc/html/rfc7636)
 * and state params are required for Snyk Apps authorization. As such the
 * state and pkce configuration for the passport OAAuth2Strategy have been
 * set to true.
 *
 * @returns passport OAuth2Strategy.
 */
export function getOAuth2(): OAuth2Strategy {
  /**
   * All the required values are read from environmental variables
   * as these values are to be kept confidential
   * 1. clientID: The client of the Snyk app you created
   * 2. clientSecret: The client secret of the the Snyk app you created
   * 3. callbackURL: The callback URL for your Snyk app
   */
  const clientID = process.env[Envars.ClientId] as string;
  const clientSecret = process.env[Envars.ClientSecret] as string;
  const callbackURL = process.env[Envars.RedirectUri] as string;

  return new OAuth2Strategy(
    {
      authorizationURL: `${APP_BASE}${config.get(Config.AuthURL)}`,
      tokenURL: `${API_BASE}${config.get(Config.TokenURL)}`,
      clientID: clientID,
      clientSecret: clientSecret,
      callbackURL: callbackURL,
      state: true,
      pkce: true,
      passReqToCallback: true,
    },
    async function (
      req: Request,
      access_token: string,
      refresh_token: string,
      params: Params,
      profile: AxiosResponse,
      done: VerifyCallback,
    ) {
      try {
        /**
         * We highly encourage you to use the new rest endpoints to gather any
         * information for profile management, but for demo purposes we are
         * using the V1 endpoint.
         */
        const response = await callSnykApi('bearer', access_token).get('/user/me');
        const userId = response.data.id;
        const { expires_in, scope, token_type } = params;
        /**
         * Fetch all the orgs that the given accessToken has access to. The orgs
         * will later be used in the app to fetch the list of projects for the orgs.
         */
        const { orgs } = await getAppOrgs(token_type, access_token);
        const ed = new EncryptDecrypt(process.env[Envars.EncryptionSecret] as string);
        await writeToDb({
          date: new Date(),
          userId,
          orgs,
          access_token: ed.encryptString(access_token),
          expires_in,
          scope,
          token_type,
          refresh_token: ed.encryptString(refresh_token),
        } as AuthData);
      } catch (error) {
        return done(error as Error, false);
      }
      return done(null, {});
    },
  );
}
