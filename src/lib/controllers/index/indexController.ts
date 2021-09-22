import type { Controller } from '../../types';
import { Envars } from '../../types';
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
    if (req.user) return res.redirect('/projects');
    return res.render('index');
  }
}
