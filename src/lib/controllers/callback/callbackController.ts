import type { Controller } from '../../types';
import type { NextFunction, Request, Response } from 'express';
import { Router } from 'express';

export class CallbackController implements Controller {
  public path = '/callback';
  public router = Router();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(`${this.path}`, this.callback);
  }

  private callback(req: Request, res: Response, next: NextFunction) {
    // Callback related verifications can be done here
    console.log('Return params: ', req.query);
    /**
     * Example:
     * {
            code: '8ghYHKGfqIi1Gahgu5i8riOhHBtkJgyISLVS846Mbmc.WvBFMCLWOGp0hzjsd9xCG4clt9CMj1vd-RewRnxCqjY',
            scope: '',
            state: 'Qy8 QWoi4qOw4l5SE7aEgw=='
        }
     */
    // TODO: call https://snyk.io/api/v3/apps/oauth2/token
    // {
    //     grant_type: authorization_code,
    //     code: code,
    //     redirect_uri: redirect URI - must match above,
    //     client_id: clientId,
    //     client_secret: clientSecret
    //     }
    // TODO: Fetch the access_token and refresh_token

    return res.render('callback');
  }
}
