import type { Controller } from '../../types';
import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';

/**
 * The DefaultController class for all unhandled requests.
 * Every controller class implements the controller interface
 * which has two members the path and the router.
 */
export class DefaultController implements Controller {
  /**
   * Regex to accept all path, mind you this controller
   * should be at the last of the controller list
   * as this means it will be match is express finds no
   * other path to match to
   * */
  public path = '*';
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
    // Matches all the unmatched routes and display the default not found page
    this.router.get(`${this.path}`, this.notFound);
  }

  private notFound(req: Request, res: Response, next: NextFunction) {
    return res.render('default');
  }
}
