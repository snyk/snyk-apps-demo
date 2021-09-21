import { Controller } from '../../types';
import type { Request, Response, NextFunction } from 'express';
import { Router } from 'express';
import passport from 'passport';

export class AuthController implements Controller {
  public path = '/auth';
  public router = Router();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(`${this.path}`, passport.authenticate('oauth2'));
  }
}
