import OAuth2Strategy from 'passport-oauth2';
import type { Request } from 'express';

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
    function (req: Request, access_token: string, refresh_token: string, params: any, profile: any, done: any) {
      console.log(access_token, refresh_token, profile);
      console.log('Expiry: ', params.expires_in);
      return done(null, profile);
    },
  );
}
