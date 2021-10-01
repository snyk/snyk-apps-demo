import type { Controller } from '../../types';
import type { Request, Response, NextFunction } from 'express';
import { Router } from 'express';

/**
 * The IndexController class for handling index/home page
 * and related requests. Every controller class
 * implements the controller interface which
 * has two members the path and the router.
 */
export class IndexController implements Controller {
  // The base URL path for this controller
  public path = '/';
  // Express router for this controller
  public router = Router();

  /**
   * The constructor is used to initialize the
   * routes for this controller
   */
  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    // Index route for the home page of the app
    this.router.get(`${this.path}`, this.indexPage);
  }

  /**
   * Checks if user already logged in and if yes
   * @returns the user projects page instead
   * otherwise renders the index page which
   * asks the user to install the app
   */
  private indexPage(req: Request, res: Response, next: NextFunction) {
    if (req.user) return res.redirect('/projects');
    return res.render('index');
  }
}
