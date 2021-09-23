import type { Controller } from '../../types';
import type { NextFunction, Request, Response } from 'express';
import { Router } from 'express';

export class SettingsController implements Controller {
  public path: string = '/settings';
  public router: Router = Router();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(`${this.path}`, this.displaySettings);
  }

  private displaySettings(req: Request, res: Response, next: NextFunction) {
    return res.render('settings');
  }
}
