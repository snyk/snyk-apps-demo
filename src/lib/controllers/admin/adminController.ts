import type { Controller } from '../../types';
import type { NextFunction, Request, Response } from 'express';
import { Router } from 'express';
import { readFromDb} from '../../utils/db';

export class AdminController implements Controller {
  public path: string = '/admin';
  public router: Router = Router();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(`${this.path}`, this.admin);
  }

  private async admin(req: Request, res: Response, next: NextFunction) {
    const db = await readFromDb();
    return res.render('admin', {
      loading: false,
      installs: db.installs,
    });
  }
}
