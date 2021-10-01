import type { Controller } from '../../types';
import type { NextFunction, Request, Response } from 'express';
import { Router } from 'express';

/**
 * The SettingsController class for handling settings page
 * for the user and the related requests. Every controller class
 * implements the controller interface which
 * has two members the path and the router.
 */
export class SettingsController implements Controller {
  // The base URL path for this controller
  public path = '/settings';
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
    // Setup the settings route
    this.router.get(`${this.path}`, this.displaySettings);
  }

  /**
   * @returns render the user settings page
   */
  private displaySettings(req: Request, res: Response, next: NextFunction) {
    return res.render('settings');
  }
}
