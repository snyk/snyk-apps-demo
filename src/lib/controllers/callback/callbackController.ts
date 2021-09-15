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
    return res.render('callback');
  }
}
