import type { Controller } from '../../types';
import type { NextFunction, Request, Response } from 'express';
import { Router } from 'express';
import { HttpException } from '../../exceptions';
import passport from 'passport';
import { errRedirect } from '../../middlewares';

/**
 * The CallbackController class for handling the last
 * step of Snyk Authorization flow with Snyk. That is,
 * to handle failure and success of authentication flow.
 * Every controller class implements the controller
 * interface which has two members the path and the router.
 */
export class CallbackController implements Controller {
  // The base URL path for this controller
  public path = '/callback';
  // Express router for this controller
  public router: Router = Router();

  /**
   * The constructor is used to initialize the
   * routes for this controller
   */
  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    // Path to handle the result of authentication flow or the callback/redirect_uri
    // Uses redirect err middleware to handle error passed in query parameters of the redirect_uri
    this.router.get(`${this.path}`, errRedirect, this.passportAuthenticate());
    // Path to handle success, same as what we pass to passport
    this.router.get(`${this.path}/success`, this.success);
    // Path to handle failure, same as what we pass to passport
    this.router.get(`${this.path}/failure`, this.failure);
  }

  private passportAuthenticate() {
    return passport.authenticate('oauth2', {
      successRedirect: '/callback/success',
      failureRedirect: '/callback/failure',
    });
  }
  /**
   * Handle the success response of authentication
   * @returns The callback EJS template
   */
  private success(req: Request, res: Response, next: NextFunction) {
    return res.render('callback');
  }
  /**
   * Handle the failure response of authentication
   * @returns Sends error through the next function to the
   * error handler middleware
   */
  private failure(req: Request, res: Response, next: NextFunction) {
    return next(new HttpException(401, 'Authentication failed'));
  }
}
