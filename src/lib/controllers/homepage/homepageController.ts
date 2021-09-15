import type { Controller } from '../../types';
import type { Request, Response, NextFunction } from 'express';
import { Router } from 'express';

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
    return res.render('homepage');
  }
}
