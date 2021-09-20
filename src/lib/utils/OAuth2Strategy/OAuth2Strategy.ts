import OAuth2Strategy from 'passport-oauth2';
import { Envars } from '../../types';

export const OAuth2 = new OAuth2Strategy(
  {
    authorizationURL: `http://local.snyk.io/apps/oauth2/authorize`,
    tokenURL: 'http://localhost:3846/oauth2/token',
    clientID: process.env[Envars.ClientId] as string,
    clientSecret: process.env[Envars.ClientSecret] as string,
    callbackURL: process.env[Envars.RedirectUri] as string,
  },
  function (access_token: string, refresh_token: string, profile: any, done: any) {
    console.log(access_token, refresh_token, profile);
    return done(null, profile);
  },
);
