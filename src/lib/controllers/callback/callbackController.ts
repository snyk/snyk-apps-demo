import type { Controller } from '../../types';
import type { NextFunction, Request, Response } from 'express';
import { Router } from 'express';
import { HttpException } from '../../exceptions';
import passport from 'passport';

export class CallbackController implements Controller {
  public path: string = '/callback';
  public router: Router = Router();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(`${this.path}`, this.passportAuthenticatte());
    this.router.get(`${this.path}/success`, this.success);
    this.router.get(`${this.path}/failure`, this.failure);
  }

  private passportAuthenticatte() {
    return passport.authenticate('oauth2', {
      successRedirect: '/callback/success',
      failureRedirect: '/callback/failure',
    });
  }

  private success(req: Request, res: Response, next: NextFunction) {
    return res.render('callback');
  }

  private failure(req: Request, res: Response, next: NextFunction) {
    return next(new HttpException(401, 'Authentication failed'));
  }
}
