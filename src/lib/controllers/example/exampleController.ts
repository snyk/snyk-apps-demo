import type { Controller } from '../../types';
import type { Request, Response, NextFunction } from 'express';
import { Router } from 'express';

/**
 * The ExampleController class for handling example requests.
 * Every controller class implements the controller interface which
 * has two members the path and the router.
 */
export class ExampleController implements Controller {
  // The base URL path for this controller
  public path = '/example';
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
    // The base route to mostly check if you app is running or not
    this.router.get(`${this.path}`, this.helloWorld);
  }

  private helloWorld(req: Request, res: Response, next: NextFunction) {
    return res.send('Hello World');
  }
}
