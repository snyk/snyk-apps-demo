import type { Controller } from '../../types';
import type { NextFunction, Request, Response } from 'express';
import { Router } from 'express';
import { readFromDb } from '../../utils/db';

/**
 * The AdminController class for handling admin page
 * and related requests. Every controller class
 * implements the controller interface which
 * has two members the path and the router.
 */
export class AdminController implements Controller {
  // The base URL path for this controller
  public path = '/admin';
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
    // Admin route to get to the app settings
    this.router.get(`${this.path}`, this.settings);
    // Admin route to get to all the installs for the Snyk app
    this.router.get(`${this.path}/installs`, this.installs);
  }

  /**
   * @returns Renders the admin page with all installs from the database
   */
  private async installs(req: Request, res: Response, next: NextFunction) {
    const db = await readFromDb();
    return res.render('admin-installs', {
      installs: db.installs || [],
    });
  }

  /**
   * @returns Renders the settings page
   */
  private async settings(req: Request, res: Response, next: NextFunction) {
    return res.render('admin-settings');
  }
}
