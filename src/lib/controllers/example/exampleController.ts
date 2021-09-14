import type { Controller } from '../../types';
import type { Request, Response, NextFunction } from 'express';
import { Router } from 'express';

export class ExampleController implements Controller {
  public path = '/example';
  public router = Router();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(`${this.path}`, this.helloWorld);
  }

  private helloWorld(req: Request, res: Response, next: NextFunction) {
    return res.send('Hello World');
  }
}
