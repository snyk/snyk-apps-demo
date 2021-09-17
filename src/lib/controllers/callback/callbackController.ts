import type { Controller } from '../../types';
import type { NextFunction, Request, Response } from 'express';
import { Router } from 'express';
import { writeToDb } from '../../utils/db';
import axios from 'axios';
import qs from 'qs';

export class CallbackController implements Controller {
  public path: string = '/callback';
  public router: Router = Router();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(`${this.path}`, this.callback);
  }

  private async callback(req: Request, res: Response, next: NextFunction) {
    const redirect_uri = process.env.REDIRECT_URI;
    const client_id = process.env.CLIENT_ID;
    const client_secret = process.env.CLIENT_SECRET;
    // Callback related verifications can be done here
    const { code, scope, state } = req.query;
    // Using local oauth server, should be replaced with snyk
    try {
      const result = await axios({
        method: 'POST',
        url: 'http://localhost:3846/oauth2/token',
        data: qs.stringify({
          grant_type: 'authorization_code',
          code,
          client_id,
          client_secret,
          redirect_uri,
        }),
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
      });
      const { access_token, expires_in, scope, token_type, refresh_token } =
        result.data;
      // We should encrypt before saving
      await writeToDb({
        access_token,
        expires_in,
        scope,
        token_type,
        refresh_token,
      });
    } catch (error) {
      console.error(error);
      return next(new Error('Error occurred while fetching the token!'));
    }
    return res.render('callback', { loading: false });
  }
}
