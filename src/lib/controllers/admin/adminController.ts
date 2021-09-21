import type { Controller } from '../../types';
import type { NextFunction, Request, Response } from 'express';
import { Router } from 'express';
import { readFromDb } from '../../utils/db';

export class AdminController implements Controller {
  public path: string = '/admin';
  public router: Router = Router();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(`${this.path}`, this.settings);
    this.router.get(`${this.path}/installs`, this.installs);
  }

  private async installs(req: Request, res: Response, next: NextFunction) {
    const db = await readFromDb();
    return res.render('admin-installs', {
      loading: false,
      installs: db.installs || [],
    });
  }

  private async settings(req: Request, res: Response, next: NextFunction) {
    return res.render('admin-settings', { loading: false });
  }
}
