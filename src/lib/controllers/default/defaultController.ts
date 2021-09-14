import type { Controller } from '../../types';
import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';

export class DefaultController implements Controller {
  public path = '*';
  public router = Router();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(`${this.path}`, this.notFound);
  }

  private notFound(req: Request, res: Response, next: NextFunction) {
    return res.render('default');
  }
}
