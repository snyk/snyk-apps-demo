import type { Controller } from '../../types';
import { Envars } from '../../types';
import type { Request, Response, NextFunction } from 'express';
import { Router } from 'express';
import { generateUrl } from '../../utils';
import passport from 'passport';
import OAuth2Strategy from 'passport-oauth2';
import { APP_BASE } from '../../../app';

export class HomepageController implements Controller {
  public path = '/';
  public router = Router();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(`${this.path}`, this.homepage);
  }

  private homepage(req: Request, res: Response, next: NextFunction) {
    const authorizeUrl = generateUrl();
    return res.render('homepage', { authorizeUrl, loading: false });
  }
}
