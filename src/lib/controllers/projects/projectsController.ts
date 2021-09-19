import type { AuthData, Controller } from '../../types';
import type { NextFunction, Request, Response } from 'express';
import { Router } from 'express';
import { readFromDb } from '../../utils/db';
import axios from 'axios';
import { API_BASE } from '../../../app';

export class ProjectsController implements Controller {
  public path = '/projects';
  public router = Router();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(`${this.path}`, this.getProjects);
  }

  private async getProjects(req: Request, res: Response, next: NextFunction) {
    try {
      const db = await readFromDb();
      const data = ProjectsController.mostRecent(db.installs);
      const access_token = data?.access_token;
      const token_type = data?.token_type;

      if (!data) return res.render('projects', { loading: false, projects: [] });

      const result = await axios({
        method: 'POST',
        url: `${API_BASE}/v1/org/${data?.orgId}/projects`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token_type} ${access_token}`,
        },
      });
      return res.render('projects', {
        loading: false,
        projects: result.data.projects || [],
      });
    } catch (error) {
      return next(error);
    }
  }

  private static mostRecent(installs: AuthData[]): AuthData | void {
    if (installs) {
      return installs[installs.length - 1];
    }
    return;
  }
}
